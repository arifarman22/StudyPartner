from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Boolean, Float
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True)
    name = Column(String(255))
    hashed_password = Column(String(255))
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=func.now())
    
    # Relationships
    syllabuses = relationship("Syllabus", back_populates="owner")
    materials = relationship("StudyMaterial", back_populates="owner")
    schedules = relationship("StudySchedule", back_populates="owner")

class Syllabus(Base):
    __tablename__ = "syllabuses"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255))
    description = Column(Text)
    start_date = Column(DateTime)
    end_date = Column(DateTime)
    user_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=func.now())
    
    # Relationships
    owner = relationship("User", back_populates="syllabuses")
    topics = relationship("SyllabusTopic", back_populates="syllabus")
    schedule = relationship("StudySchedule", back_populates="syllabus", uselist=False)

class SyllabusTopic(Base):
    __tablename__ = "syllabus_topics"
    
    id = Column(Integer, primary_key=True, index=True)
    syllabus_id = Column(Integer, ForeignKey("syllabuses.id"))
    title = Column(String(255))
    description = Column(Text)
    estimated_hours = Column(Float)
    priority = Column(Integer, default=1)
    order = Column(Integer)
    completed = Column(Boolean, default=False)
    
    # Relationships
    syllabus = relationship("Syllabus", back_populates="topics")

class StudyMaterial(Base):
    __tablename__ = "study_materials"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String(255))
    description = Column(Text)
    file_path = Column(String(500))
    file_type = Column(String(50))
    topic_id = Column(Integer, ForeignKey("syllabus_topics.id"), nullable=True)
    uploaded_at = Column(DateTime, default=func.now())
    
    # Relationships
    owner = relationship("User", back_populates="materials")
    topic = relationship("SyllabusTopic")

class StudySchedule(Base):
    __tablename__ = "study_schedules"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    syllabus_id = Column(Integer, ForeignKey("syllabuses.id"))
    generated_by_ai = Column(Boolean, default=False)
    created_at = Column(DateTime, default=func.now())
    
    # Relationships
    owner = relationship("User", back_populates="schedules")
    syllabus = relationship("Syllabus", back_populates="schedule")
    items = relationship("StudyScheduleItem", back_populates="schedule")

class StudyScheduleItem(Base):
    __tablename__ = "study_schedule_items"
    
    id = Column(Integer, primary_key=True, index=True)
    schedule_id = Column(Integer, ForeignKey("study_schedules.id"))
    topic_id = Column(Integer, ForeignKey("syllabus_topics.id"))
    start_time = Column(DateTime)
    end_time = Column(DateTime)
    completed = Column(Boolean, default=False)
    
    # Relationships
    schedule = relationship("StudySchedule", back_populates="items")
    topic = relationship("SyllabusTopic")