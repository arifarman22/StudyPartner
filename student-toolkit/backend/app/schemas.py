<<<<<<< HEAD
from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime

# User schemas
class UserBase(BaseModel):
    email: EmailStr
    name: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

# Syllabus schemas
class SyllabusTopicBase(BaseModel):
    title: str
    description: Optional[str] = None
    estimated_hours: float
    priority: int = 1
    order: int
    completed: bool = False

class SyllabusTopicCreate(SyllabusTopicBase):
    pass

class SyllabusTopic(SyllabusTopicBase):
    id: int
    syllabus_id: int
    
    class Config:
        from_attributes = True

class SyllabusBase(BaseModel):
    title: str
    description: Optional[str] = None
    start_date: datetime
    end_date: datetime

class SyllabusCreate(SyllabusBase):
    topics: List[SyllabusTopicCreate] = []

class Syllabus(SyllabusBase):
    id: int
    user_id: int
    created_at: datetime
    topics: List[SyllabusTopic] = []
    
    class Config:
        from_attributes = True

# Study Material schemas
class StudyMaterialBase(BaseModel):
    title: str
    description: Optional[str] = None
    file_type: str
    topic_id: Optional[int] = None

class StudyMaterialCreate(StudyMaterialBase):
    pass

class StudyMaterial(StudyMaterialBase):
    id: int
    user_id: int
    file_path: str
    uploaded_at: datetime
    
    class Config:
        from_attributes = True

# Study Schedule schemas
class StudyScheduleItemBase(BaseModel):
    topic_id: int
    start_time: datetime
    end_time: datetime
    completed: bool = False

class StudyScheduleItemCreate(StudyScheduleItemBase):
    pass

class StudyScheduleItem(StudyScheduleItemBase):
    id: int
    schedule_id: int
    
    class Config:
        from_attributes = True

class StudyScheduleBase(BaseModel):
    syllabus_id: int
    generated_by_ai: bool = False

class StudyScheduleCreate(StudyScheduleBase):
    items: List[StudyScheduleItemCreate] = []

class StudySchedule(StudyScheduleBase):
    id: int
    user_id: int
    created_at: datetime
    items: List[StudyScheduleItem] = []
    
    class Config:
        from_attributes = True

# Token schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

# AI Agent schemas
class AIAgentRequest(BaseModel):
    syllabus_id: int
    study_hours_per_day: int = 4
=======
from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime

# User schemas
class UserBase(BaseModel):
    email: EmailStr
    name: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

# Syllabus schemas
class SyllabusTopicBase(BaseModel):
    title: str
    description: Optional[str] = None
    estimated_hours: float
    priority: int = 1
    order: int
    completed: bool = False

class SyllabusTopicCreate(SyllabusTopicBase):
    pass

class SyllabusTopic(SyllabusTopicBase):
    id: int
    syllabus_id: int
    
    class Config:
        from_attributes = True

class SyllabusBase(BaseModel):
    title: str
    description: Optional[str] = None
    start_date: datetime
    end_date: datetime

class SyllabusCreate(SyllabusBase):
    topics: List[SyllabusTopicCreate] = []

class Syllabus(SyllabusBase):
    id: int
    user_id: int
    created_at: datetime
    topics: List[SyllabusTopic] = []
    
    class Config:
        from_attributes = True

# Study Material schemas
class StudyMaterialBase(BaseModel):
    title: str
    description: Optional[str] = None
    file_type: str
    topic_id: Optional[int] = None

class StudyMaterialCreate(StudyMaterialBase):
    pass

class StudyMaterial(StudyMaterialBase):
    id: int
    user_id: int
    file_path: str
    uploaded_at: datetime
    
    class Config:
        from_attributes = True

# Study Schedule schemas
class StudyScheduleItemBase(BaseModel):
    topic_id: int
    start_time: datetime
    end_time: datetime
    completed: bool = False

class StudyScheduleItemCreate(StudyScheduleItemBase):
    pass

class StudyScheduleItem(StudyScheduleItemBase):
    id: int
    schedule_id: int
    
    class Config:
        from_attributes = True

class StudyScheduleBase(BaseModel):
    syllabus_id: int
    generated_by_ai: bool = False

class StudyScheduleCreate(StudyScheduleBase):
    items: List[StudyScheduleItemCreate] = []

class StudySchedule(StudyScheduleBase):
    id: int
    user_id: int
    created_at: datetime
    items: List[StudyScheduleItem] = []
    
    class Config:
        from_attributes = True

# Token schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

# AI Agent schemas
class AIAgentRequest(BaseModel):
    syllabus_id: int
    study_hours_per_day: int = 4
>>>>>>> 734fbeb581725ac365e00435a2cf9275fc3673fc
    preferred_study_times: List[str] = ["morning", "afternoon"]