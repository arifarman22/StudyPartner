<<<<<<< HEAD
import openai
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from . import models, schemas
import os
from typing import List
import json

# Initialize OpenAI client
openai.api_key = os.getenv("OPENAI_API_KEY")

class AIAgent:
    def __init__(self, db: Session):
        self.db = db
    
    def generate_study_schedule(self, syllabus_id: int, study_hours_per_day: int = 4, 
                              preferred_study_times: List[str] = ["morning", "afternoon"]):
        """
        Generate an optimized study schedule using AI
        """
        # Get syllabus and topics
        syllabus = self.db.query(models.Syllabus).filter(models.Syllabus.id == syllabus_id).first()
        if not syllabus:
            raise ValueError("Syllabus not found")
        
        topics = self.db.query(models.SyllabusTopic).filter(
            models.SyllabusTopic.syllabus_id == syllabus_id
        ).order_by(models.SyllabusTopic.priority.desc(), models.SyllabusTopic.order).all()
        
        # Calculate total study hours needed
        total_hours = sum(topic.estimated_hours for topic in topics)
        
        # Calculate available days
        days_available = (syllabus.end_date - syllabus.start_date).days
        if days_available <= 0:
            raise ValueError("Invalid date range")
        
        # Prepare prompt for AI
        prompt = self._create_schedule_prompt(
            syllabus, topics, total_hours, days_available, 
            study_hours_per_day, preferred_study_times
        )
        
        # Call OpenAI API
        try:
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are an expert educational planner that creates optimized study schedules."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.7
            )
            
            schedule_data = json.loads(response.choices[0].message.content)
            return self._create_schedule_objects(syllabus, schedule_data)
            
        except Exception as e:
            # Fallback to simple algorithm if AI fails
            return self._create_fallback_schedule(syllabus, topics, study_hours_per_day)
    
    def _create_schedule_prompt(self, syllabus, topics, total_hours, days_available, 
                               study_hours_per_day, preferred_study_times):
        """Create prompt for AI schedule generation"""
        topics_info = "\n".join([
            f"- {topic.title}: {topic.estimated_hours}h, priority {topic.priority}" 
            for topic in topics
        ])
        
        return f"""
        Create a study schedule for the following syllabus:
        
        Title: {syllabus.title}
        Description: {syllabus.description}
        Start Date: {syllabus.start_date}
        End Date: {syllabus.end_date}
        Total Study Hours Needed: {total_hours}
        Days Available: {days_available}
        Study Hours Per Day: {study_hours_per_day}
        Preferred Study Times: {', '.join(preferred_study_times)}
        
        Topics:
        {topics_info}
        
        Please generate a JSON response with the following structure:
        {{
          "schedule": [
            {{
              "date": "YYYY-MM-DD",
              "sessions": [
                {{
                  "start_time": "HH:MM",
                  "end_time": "HH:MM",
                  "topic_id": 1,
                  "topic_title": "Topic Name"
                }}
              ]
            }}
          ]
        }}
        
        Ensure the schedule:
        1. Covers all topics within the available time
        2. Respects priority (higher priority topics earlier)
        3. Distributes workload evenly
        4. Prefers the specified study times
        5. Includes breaks between sessions
        """
    
    def _create_schedule_objects(self, syllabus, schedule_data):
        """Convert AI response to database objects"""
        schedule = models.StudySchedule(
            syllabus_id=syllabus.id,
            user_id=syllabus.user_id,
            generated_by_ai=True
        )
        
        self.db.add(schedule)
        self.db.flush()  # Get schedule ID
        
        schedule_items = []
        for day in schedule_data["schedule"]:
            date = datetime.strptime(day["date"], "%Y-%m-%d")
            for session in day["sessions"]:
                start_time = datetime.strptime(f"{day['date']} {session['start_time']}", "%Y-%m-%d %H:%M")
                end_time = datetime.strptime(f"{day['date']} {session['end_time']}", "%Y-%m-%d %H:%M")
                
                item = models.StudyScheduleItem(
                    schedule_id=schedule.id,
                    topic_id=session["topic_id"],
                    start_time=start_time,
                    end_time=end_time
                )
                schedule_items.append(item)
        
        self.db.add_all(schedule_items)
        self.db.commit()
        
        return schedule
    
    def _create_fallback_schedule(self, syllabus, topics, study_hours_per_day):
        """Create a simple schedule if AI fails"""
        schedule = models.StudySchedule(
            syllabus_id=syllabus.id,
            user_id=syllabus.user_id,
            generated_by_ai=False
        )
        
        self.db.add(schedule)
        self.db.flush()
        
        # Simple algorithm: distribute topics evenly across available days
        current_date = syllabus.start_date
        daily_topics = []
        daily_hours = 0
        
        for topic in topics:
            if daily_hours + topic.estimated_hours > study_hours_per_day and daily_topics:
                # Add current day's topics to schedule
                self._add_daily_schedule(schedule.id, current_date, daily_topics, study_hours_per_day)
                current_date += timedelta(days=1)
                daily_topics = []
                daily_hours = 0
            
            daily_topics.append(topic)
            daily_hours += topic.estimated_hours
        
        # Add remaining topics
        if daily_topics:
            self._add_daily_schedule(schedule.id, current_date, daily_topics, study_hours_per_day)
        
        self.db.commit()
        return schedule
    
    def _add_daily_schedule(self, schedule_id, date, topics, study_hours_per_day):
        """Add a day's worth of topics to the schedule"""
        start_time = datetime.combine(date, datetime.strptime("09:00", "%H:%M").time())
        time_slots = []
        
        for topic in topics:
            duration = min(topic.estimated_hours, study_hours_per_day / 2)
            end_time = start_time + timedelta(hours=duration)
            
            item = models.StudyScheduleItem(
                schedule_id=schedule_id,
                topic_id=topic.id,
                start_time=start_time,
                end_time=end_time
            )
            
            time_slots.append(item)
            start_time = end_time + timedelta(minutes=15)  # 15-minute break
        
=======
import openai
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from . import models, schemas
import os
from typing import List
import json

# Initialize OpenAI client
openai.api_key = os.getenv("OPENAI_API_KEY")

class AIAgent:
    def __init__(self, db: Session):
        self.db = db
    
    def generate_study_schedule(self, syllabus_id: int, study_hours_per_day: int = 4, 
                              preferred_study_times: List[str] = ["morning", "afternoon"]):
        """
        Generate an optimized study schedule using AI
        """
        # Get syllabus and topics
        syllabus = self.db.query(models.Syllabus).filter(models.Syllabus.id == syllabus_id).first()
        if not syllabus:
            raise ValueError("Syllabus not found")
        
        topics = self.db.query(models.SyllabusTopic).filter(
            models.SyllabusTopic.syllabus_id == syllabus_id
        ).order_by(models.SyllabusTopic.priority.desc(), models.SyllabusTopic.order).all()
        
        # Calculate total study hours needed
        total_hours = sum(topic.estimated_hours for topic in topics)
        
        # Calculate available days
        days_available = (syllabus.end_date - syllabus.start_date).days
        if days_available <= 0:
            raise ValueError("Invalid date range")
        
        # Prepare prompt for AI
        prompt = self._create_schedule_prompt(
            syllabus, topics, total_hours, days_available, 
            study_hours_per_day, preferred_study_times
        )
        
        # Call OpenAI API
        try:
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are an expert educational planner that creates optimized study schedules."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.7
            )
            
            schedule_data = json.loads(response.choices[0].message.content)
            return self._create_schedule_objects(syllabus, schedule_data)
            
        except Exception as e:
            # Fallback to simple algorithm if AI fails
            return self._create_fallback_schedule(syllabus, topics, study_hours_per_day)
    
    def _create_schedule_prompt(self, syllabus, topics, total_hours, days_available, 
                               study_hours_per_day, preferred_study_times):
        """Create prompt for AI schedule generation"""
        topics_info = "\n".join([
            f"- {topic.title}: {topic.estimated_hours}h, priority {topic.priority}" 
            for topic in topics
        ])
        
        return f"""
        Create a study schedule for the following syllabus:
        
        Title: {syllabus.title}
        Description: {syllabus.description}
        Start Date: {syllabus.start_date}
        End Date: {syllabus.end_date}
        Total Study Hours Needed: {total_hours}
        Days Available: {days_available}
        Study Hours Per Day: {study_hours_per_day}
        Preferred Study Times: {', '.join(preferred_study_times)}
        
        Topics:
        {topics_info}
        
        Please generate a JSON response with the following structure:
        {{
          "schedule": [
            {{
              "date": "YYYY-MM-DD",
              "sessions": [
                {{
                  "start_time": "HH:MM",
                  "end_time": "HH:MM",
                  "topic_id": 1,
                  "topic_title": "Topic Name"
                }}
              ]
            }}
          ]
        }}
        
        Ensure the schedule:
        1. Covers all topics within the available time
        2. Respects priority (higher priority topics earlier)
        3. Distributes workload evenly
        4. Prefers the specified study times
        5. Includes breaks between sessions
        """
    
    def _create_schedule_objects(self, syllabus, schedule_data):
        """Convert AI response to database objects"""
        schedule = models.StudySchedule(
            syllabus_id=syllabus.id,
            user_id=syllabus.user_id,
            generated_by_ai=True
        )
        
        self.db.add(schedule)
        self.db.flush()  # Get schedule ID
        
        schedule_items = []
        for day in schedule_data["schedule"]:
            date = datetime.strptime(day["date"], "%Y-%m-%d")
            for session in day["sessions"]:
                start_time = datetime.strptime(f"{day['date']} {session['start_time']}", "%Y-%m-%d %H:%M")
                end_time = datetime.strptime(f"{day['date']} {session['end_time']}", "%Y-%m-%d %H:%M")
                
                item = models.StudyScheduleItem(
                    schedule_id=schedule.id,
                    topic_id=session["topic_id"],
                    start_time=start_time,
                    end_time=end_time
                )
                schedule_items.append(item)
        
        self.db.add_all(schedule_items)
        self.db.commit()
        
        return schedule
    
    def _create_fallback_schedule(self, syllabus, topics, study_hours_per_day):
        """Create a simple schedule if AI fails"""
        schedule = models.StudySchedule(
            syllabus_id=syllabus.id,
            user_id=syllabus.user_id,
            generated_by_ai=False
        )
        
        self.db.add(schedule)
        self.db.flush()
        
        # Simple algorithm: distribute topics evenly across available days
        current_date = syllabus.start_date
        daily_topics = []
        daily_hours = 0
        
        for topic in topics:
            if daily_hours + topic.estimated_hours > study_hours_per_day and daily_topics:
                # Add current day's topics to schedule
                self._add_daily_schedule(schedule.id, current_date, daily_topics, study_hours_per_day)
                current_date += timedelta(days=1)
                daily_topics = []
                daily_hours = 0
            
            daily_topics.append(topic)
            daily_hours += topic.estimated_hours
        
        # Add remaining topics
        if daily_topics:
            self._add_daily_schedule(schedule.id, current_date, daily_topics, study_hours_per_day)
        
        self.db.commit()
        return schedule
    
    def _add_daily_schedule(self, schedule_id, date, topics, study_hours_per_day):
        """Add a day's worth of topics to the schedule"""
        start_time = datetime.combine(date, datetime.strptime("09:00", "%H:%M").time())
        time_slots = []
        
        for topic in topics:
            duration = min(topic.estimated_hours, study_hours_per_day / 2)
            end_time = start_time + timedelta(hours=duration)
            
            item = models.StudyScheduleItem(
                schedule_id=schedule_id,
                topic_id=topic.id,
                start_time=start_time,
                end_time=end_time
            )
            
            time_slots.append(item)
            start_time = end_time + timedelta(minutes=15)  # 15-minute break
        
>>>>>>> 734fbeb581725ac365e00435a2cf9275fc3673fc
        self.db.add_all(time_slots)