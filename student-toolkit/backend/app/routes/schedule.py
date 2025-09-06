<<<<<<< HEAD
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from .. import models, schemas, ai_agent
from ..auth import get_current_user

router = APIRouter()

@router.post("/generate", response_model=schemas.StudySchedule)
def generate_schedule(
    request: schemas.AIAgentRequest,
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(get_current_user)
):
    # Verify syllabus belongs to user
    syllabus = db.query(models.Syllabus).filter(
        models.Syllabus.id == request.syllabus_id,
        models.Syllabus.user_id == current_user.id
    ).first()
    
    if syllabus is None:
        raise HTTPException(status_code=404, detail="Syllabus not found")
    
    # Use AI agent to generate schedule
    agent = ai_agent.AIAgent(db)
    schedule = agent.generate_study_schedule(
        request.syllabus_id,
        request.study_hours_per_day,
        request.preferred_study_times
    )
    
    return schedule

@router.get("/", response_model=List[schemas.StudySchedule])
def read_schedules(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(get_current_user)
):
    schedules = db.query(models.StudySchedule).filter(
        models.StudySchedule.user_id == current_user.id
    ).offset(skip).limit(limit).all()
    return schedules

@router.get("/{schedule_id}", response_model=schemas.StudySchedule)
def read_schedule(
    schedule_id: int,
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(get_current_user)
):
    schedule = db.query(models.StudySchedule).filter(
        models.StudySchedule.id == schedule_id,
        models.StudySchedule.user_id == current_user.id
    ).first()
    
    if schedule is None:
        raise HTTPException(status_code=404, detail="Schedule not found")
    
    return schedule

@router.put("/item/{item_id}/complete")
def mark_item_complete(
    item_id: int,
    completed: bool,
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(get_current_user)
):
    item = db.query(models.StudyScheduleItem).join(models.StudySchedule).filter(
        models.StudyScheduleItem.id == item_id,
        models.StudySchedule.user_id == current_user.id
    ).first()
    
    if item is None:
        raise HTTPException(status_code=404, detail="Schedule item not found")
    
    item.completed = completed
    db.commit()
    
=======
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from .. import models, schemas, ai_agent
from ..auth import get_current_user

router = APIRouter()

@router.post("/generate", response_model=schemas.StudySchedule)
def generate_schedule(
    request: schemas.AIAgentRequest,
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(get_current_user)
):
    # Verify syllabus belongs to user
    syllabus = db.query(models.Syllabus).filter(
        models.Syllabus.id == request.syllabus_id,
        models.Syllabus.user_id == current_user.id
    ).first()
    
    if syllabus is None:
        raise HTTPException(status_code=404, detail="Syllabus not found")
    
    # Use AI agent to generate schedule
    agent = ai_agent.AIAgent(db)
    schedule = agent.generate_study_schedule(
        request.syllabus_id,
        request.study_hours_per_day,
        request.preferred_study_times
    )
    
    return schedule

@router.get("/", response_model=List[schemas.StudySchedule])
def read_schedules(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(get_current_user)
):
    schedules = db.query(models.StudySchedule).filter(
        models.StudySchedule.user_id == current_user.id
    ).offset(skip).limit(limit).all()
    return schedules

@router.get("/{schedule_id}", response_model=schemas.StudySchedule)
def read_schedule(
    schedule_id: int,
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(get_current_user)
):
    schedule = db.query(models.StudySchedule).filter(
        models.StudySchedule.id == schedule_id,
        models.StudySchedule.user_id == current_user.id
    ).first()
    
    if schedule is None:
        raise HTTPException(status_code=404, detail="Schedule not found")
    
    return schedule

@router.put("/item/{item_id}/complete")
def mark_item_complete(
    item_id: int,
    completed: bool,
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(get_current_user)
):
    item = db.query(models.StudyScheduleItem).join(models.StudySchedule).filter(
        models.StudyScheduleItem.id == item_id,
        models.StudySchedule.user_id == current_user.id
    ).first()
    
    if item is None:
        raise HTTPException(status_code=404, detail="Schedule item not found")
    
    item.completed = completed
    db.commit()
    
>>>>>>> 734fbeb581725ac365e00435a2cf9275fc3673fc
    return {"message": "Item updated successfully"}