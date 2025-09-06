<<<<<<< HEAD
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from .. import models, schemas
from ..auth import get_current_user

router = APIRouter()

@router.post("/", response_model=schemas.Syllabus)
def create_syllabus(
    syllabus: schemas.SyllabusCreate,
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(get_current_user)
):
    db_syllabus = models.Syllabus(
        title=syllabus.title,
        description=syllabus.description,
        start_date=syllabus.start_date,
        end_date=syllabus.end_date,
        user_id=current_user.id
    )
    db.add(db_syllabus)
    db.commit()
    db.refresh(db_syllabus)
    
    # Add topics
    for order, topic in enumerate(syllabus.topics):
        db_topic = models.SyllabusTopic(
            syllabus_id=db_syllabus.id,
            title=topic.title,
            description=topic.description,
            estimated_hours=topic.estimated_hours,
            priority=topic.priority,
            order=order
        )
        db.add(db_topic)
    
    db.commit()
    db.refresh(db_syllabus)
    return db_syllabus

@router.get("/", response_model=List[schemas.Syllabus])
def read_syllabuses(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(get_current_user)
):
    syllabuses = db.query(models.Syllabus).filter(
        models.Syllabus.user_id == current_user.id
    ).offset(skip).limit(limit).all()
    return syllabuses

@router.get("/{syllabus_id}", response_model=schemas.Syllabus)
def read_syllabus(
    syllabus_id: int,
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(get_current_user)
):
    syllabus = db.query(models.Syllabus).filter(
        models.Syllabus.id == syllabus_id,
        models.Syllabus.user_id == current_user.id
    ).first()
    
    if syllabus is None:
        raise HTTPException(status_code=404, detail="Syllabus not found")
    
    return syllabus

@router.put("/{syllabus_id}", response_model=schemas.Syllabus)
def update_syllabus(
    syllabus_id: int,
    syllabus: schemas.SyllabusBase,
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(get_current_user)
):
    db_syllabus = db.query(models.Syllabus).filter(
        models.Syllabus.id == syllabus_id,
        models.Syllabus.user_id == current_user.id
    ).first()
    
    if db_syllabus is None:
        raise HTTPException(status_code=404, detail="Syllabus not found")
    
    for key, value in syllabus.dict().items():
        setattr(db_syllabus, key, value)
    
    db.commit()
    db.refresh(db_syllabus)
    return db_syllabus

@router.delete("/{syllabus_id}")
def delete_syllabus(
    syllabus_id: int,
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(get_current_user)
):
    syllabus = db.query(models.Syllabus).filter(
        models.Syllabus.id == syllabus_id,
        models.Syllabus.user_id == current_user.id
    ).first()
    
    if syllabus is None:
        raise HTTPException(status_code=404, detail="Syllabus not found")
    
    db.delete(syllabus)
    db.commit()
=======
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from .. import models, schemas
from ..auth import get_current_user

router = APIRouter()

@router.post("/", response_model=schemas.Syllabus)
def create_syllabus(
    syllabus: schemas.SyllabusCreate,
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(get_current_user)
):
    db_syllabus = models.Syllabus(
        title=syllabus.title,
        description=syllabus.description,
        start_date=syllabus.start_date,
        end_date=syllabus.end_date,
        user_id=current_user.id
    )
    db.add(db_syllabus)
    db.commit()
    db.refresh(db_syllabus)
    
    # Add topics
    for order, topic in enumerate(syllabus.topics):
        db_topic = models.SyllabusTopic(
            syllabus_id=db_syllabus.id,
            title=topic.title,
            description=topic.description,
            estimated_hours=topic.estimated_hours,
            priority=topic.priority,
            order=order
        )
        db.add(db_topic)
    
    db.commit()
    db.refresh(db_syllabus)
    return db_syllabus

@router.get("/", response_model=List[schemas.Syllabus])
def read_syllabuses(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(get_current_user)
):
    syllabuses = db.query(models.Syllabus).filter(
        models.Syllabus.user_id == current_user.id
    ).offset(skip).limit(limit).all()
    return syllabuses

@router.get("/{syllabus_id}", response_model=schemas.Syllabus)
def read_syllabus(
    syllabus_id: int,
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(get_current_user)
):
    syllabus = db.query(models.Syllabus).filter(
        models.Syllabus.id == syllabus_id,
        models.Syllabus.user_id == current_user.id
    ).first()
    
    if syllabus is None:
        raise HTTPException(status_code=404, detail="Syllabus not found")
    
    return syllabus

@router.put("/{syllabus_id}", response_model=schemas.Syllabus)
def update_syllabus(
    syllabus_id: int,
    syllabus: schemas.SyllabusBase,
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(get_current_user)
):
    db_syllabus = db.query(models.Syllabus).filter(
        models.Syllabus.id == syllabus_id,
        models.Syllabus.user_id == current_user.id
    ).first()
    
    if db_syllabus is None:
        raise HTTPException(status_code=404, detail="Syllabus not found")
    
    for key, value in syllabus.dict().items():
        setattr(db_syllabus, key, value)
    
    db.commit()
    db.refresh(db_syllabus)
    return db_syllabus

@router.delete("/{syllabus_id}")
def delete_syllabus(
    syllabus_id: int,
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(get_current_user)
):
    syllabus = db.query(models.Syllabus).filter(
        models.Syllabus.id == syllabus_id,
        models.Syllabus.user_id == current_user.id
    ).first()
    
    if syllabus is None:
        raise HTTPException(status_code=404, detail="Syllabus not found")
    
    db.delete(syllabus)
    db.commit()
>>>>>>> 734fbeb581725ac365e00435a2cf9275fc3673fc
    return {"message": "Syllabus deleted successfully"}