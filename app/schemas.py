from pydantic import BaseModel, EmailStr
from datetime import datetime


# -------- USERS --------
class UserCreate(BaseModel):
    name: str
    email: EmailStr


class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr

    class Config:
        from_attributes = True


# -------- COURSES --------
class CourseCreate(BaseModel):
    title: str
    description: str | None = None


class CourseResponse(BaseModel):
    id: int
    title: str
    description: str | None

    class Config:
        from_attributes = True


# -------- ENROLLMENT --------
class EnrollmentCreate(BaseModel):
    user_id: int
    course_id: int


class EnrollmentResponse(BaseModel):
    id: int
    user_id: int
    course_id: int
    enrolled_at: datetime

    class Config:
        from_attributes = True


# -------- PROGRESS --------
class ProgressUpdate(BaseModel):
    user_id: int
    course_id: int
    progress: int


class ProgressResponse(BaseModel):
    enrollment_id: int
    progress_percentage: int
    last_updated: datetime

    class Config:
        from_attributes = True
