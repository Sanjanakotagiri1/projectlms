from pydantic import BaseModel, EmailStr, ConfigDict
from datetime import datetime


# -------- USERS --------
class UserCreate(BaseModel):
    name: str
    email: EmailStr


class UserResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    email: EmailStr


# -------- COURSES --------
class CourseCreate(BaseModel):
    title: str
    description: str | None = None


class CourseResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    description: str | None = None


# -------- ENROLLMENT --------
class EnrollmentCreate(BaseModel):
    user_id: int
    course_id: int


class EnrollmentResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    user_id: int
    course_id: int
    enrolled_at: datetime


# -------- PROGRESS --------
class ProgressUpdate(BaseModel):
    user_id: int
    course_id: int


class ProgressResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    enrollment_id: int
    progress_percentage: int
    last_updated: datetime
