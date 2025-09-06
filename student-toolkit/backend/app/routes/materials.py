<<<<<<< HEAD
from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import List
import os
import aiofiles
from ..database import get_db
from .. import models, schemas
from ..auth import get_current_user

router = APIRouter()

UPLOAD_DIR = "uploads"

@router.post("/", response_model=schemas.StudyMaterial)
async def upload_material(
    title: str = Form(...),
    description: str = Form(None),
    file_type: str = Form(...),
    topic_id: int = Form(None),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(get_current_user)
):
    # Create user directory if it doesn't exist
    user_dir = os.path.join(UPLOAD_DIR, str(current_user.id))
    os.makedirs(user_dir, exist_ok=True)
    
    # Save file
    file_path = os.path.join(user_dir, file.filename)
    async with aiofiles.open(file_path, 'wb') as out_file:
        content = await file.read()
        await out_file.write(content)
    
    # Create database record
    db_material = models.StudyMaterial(
        user_id=current_user.id,
        title=title,
        description=description,
        file_path=file_path,
        file_type=file_type,
        topic_id=topic_id
    )
    
    db.add(db_material)
    db.commit()
    db.refresh(db_material)
    return db_material

@router.get("/", response_model=List[schemas.StudyMaterial])
def read_materials(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(get_current_user)
):
    materials = db.query(models.StudyMaterial).filter(
        models.StudyMaterial.user_id == current_user.id
    ).offset(skip).limit(limit).all()
    return materials

@router.get("/{material_id}", response_model=schemas.StudyMaterial)
def read_material(
    material_id: int,
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(get_current_user)
):
    material = db.query(models.StudyMaterial).filter(
        models.StudyMaterial.id == material_id,
        models.StudyMaterial.user_id == current_user.id
    ).first()
    
    if material is None:
        raise HTTPException(status_code=404, detail="Material not found")
    
    return material

@router.delete("/{material_id}")
def delete_material(
    material_id: int,
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(get_current_user)
):
    material = db.query(models.StudyMaterial).filter(
        models.StudyMaterial.id == material_id,
        models.StudyMaterial.user_id == current_user.id
    ).first()
    
    if material is None:
        raise HTTPException(status_code=404, detail="Material not found")
    
    # Delete file
    if os.path.exists(material.file_path):
        os.remove(material.file_path)
    
    db.delete(material)
    db.commit()
=======
from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import List
import os
import aiofiles
from ..database import get_db
from .. import models, schemas
from ..auth import get_current_user

router = APIRouter()

UPLOAD_DIR = "uploads"

@router.post("/", response_model=schemas.StudyMaterial)
async def upload_material(
    title: str = Form(...),
    description: str = Form(None),
    file_type: str = Form(...),
    topic_id: int = Form(None),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(get_current_user)
):
    # Create user directory if it doesn't exist
    user_dir = os.path.join(UPLOAD_DIR, str(current_user.id))
    os.makedirs(user_dir, exist_ok=True)
    
    # Save file
    file_path = os.path.join(user_dir, file.filename)
    async with aiofiles.open(file_path, 'wb') as out_file:
        content = await file.read()
        await out_file.write(content)
    
    # Create database record
    db_material = models.StudyMaterial(
        user_id=current_user.id,
        title=title,
        description=description,
        file_path=file_path,
        file_type=file_type,
        topic_id=topic_id
    )
    
    db.add(db_material)
    db.commit()
    db.refresh(db_material)
    return db_material

@router.get("/", response_model=List[schemas.StudyMaterial])
def read_materials(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(get_current_user)
):
    materials = db.query(models.StudyMaterial).filter(
        models.StudyMaterial.user_id == current_user.id
    ).offset(skip).limit(limit).all()
    return materials

@router.get("/{material_id}", response_model=schemas.StudyMaterial)
def read_material(
    material_id: int,
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(get_current_user)
):
    material = db.query(models.StudyMaterial).filter(
        models.StudyMaterial.id == material_id,
        models.StudyMaterial.user_id == current_user.id
    ).first()
    
    if material is None:
        raise HTTPException(status_code=404, detail="Material not found")
    
    return material

@router.delete("/{material_id}")
def delete_material(
    material_id: int,
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(get_current_user)
):
    material = db.query(models.StudyMaterial).filter(
        models.StudyMaterial.id == material_id,
        models.StudyMaterial.user_id == current_user.id
    ).first()
    
    if material is None:
        raise HTTPException(status_code=404, detail="Material not found")
    
    # Delete file
    if os.path.exists(material.file_path):
        os.remove(material.file_path)
    
    db.delete(material)
    db.commit()
>>>>>>> 734fbeb581725ac365e00435a2cf9275fc3673fc
    return {"message": "Material deleted successfully"}