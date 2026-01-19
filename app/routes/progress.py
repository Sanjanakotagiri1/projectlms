from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime

from ..database import get_db
from .. import models, schemas

router = APIRouter(prefix="/progress", tags=["Progress"])


# ---------------- UPDATE PROGRESS ----------------
@router.put("/", response_model=schemas.ProgressResponse)
def update_progress(data: schemas.ProgressUpdate, db: Session = Depends(get_db)):

    if data.progress < 0 or data.progress > 100:
        raise HTTPException(status_code=400, detail="Progress must be between 0 and 100")

    enrollment = db.query(models.Enrollment).filter(
        models.Enrollment.user_id == data.user_id,
        models.Enrollment.course_id == data.course_id
    ).first()

    if not enrollment:
        raise HTTPException(status_code=404, detail="Enrollment not found")

    progress = db.query(models.Progress).filter(
        models.Progress.enrollment_id == enrollment.id
    ).first()

    progress.progress_percentage = data.progress
    progress.last_updated = datetime.utcnow()

    db.commit()
    db.refresh(progress)

    return progress


# ---------------- TRACK / CHECK PROGRESS ----------------
@router.get("/", response_model=schemas.ProgressResponse)
def get_progress(user_id: int, course_id: int, db: Session = Depends(get_db)):

    enrollment = db.query(models.Enrollment).filter(
        models.Enrollment.user_id == user_id,
        models.Enrollment.course_id == course_id
    ).first()

    if not enrollment:
        raise HTTPException(status_code=404, detail="Enrollment not found")

    progress = db.query(models.Progress).filter(
        models.Progress.enrollment_id == enrollment.id
    ).first()

    return progress
