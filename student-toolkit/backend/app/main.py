<<<<<<< HEAD
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from .database import engine, SessionLocal
from . import models
from .routes import auth, syllabus, materials, schedule
import os

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Student Toolkit API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(syllabus.router, prefix="/syllabus", tags=["syllabus"])
app.include_router(materials.router, prefix="/materials", tags=["materials"])
app.include_router(schedule.router, prefix="/schedule", tags=["schedule"])

# Create upload directory if it doesn't exist
os.makedirs("uploads", exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

@app.get("/")
def read_root():
=======
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from .database import engine, SessionLocal
from . import models
from .routes import auth, syllabus, materials, schedule
import os

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Student Toolkit API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(syllabus.router, prefix="/syllabus", tags=["syllabus"])
app.include_router(materials.router, prefix="/materials", tags=["materials"])
app.include_router(schedule.router, prefix="/schedule", tags=["schedule"])

# Create upload directory if it doesn't exist
os.makedirs("uploads", exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

@app.get("/")
def read_root():
>>>>>>> 734fbeb581725ac365e00435a2cf9275fc3673fc
    return {"message": "Student Toolkit API is running"}