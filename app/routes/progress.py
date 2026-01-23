from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime, timezone
import random

from ..database import get_db
from .. import models, schemas

router = APIRouter(prefix="/progress", tags=["Progress"])


# ---------------- GENERATE / UPDATE PROGRESS ----------------
@router.post("/", response_model=schemas.ProgressResponse)
def generate_progress(
    data: schemas.ProgressUpdate,
    db: Session = Depends(get_db)
):
    enrollment = db.query(models.Enrollment).filter(
        models.Enrollment.user_id == data.user_id,
        models.Enrollment.course_id == data.course_id
    ).first()

    if not enrollment:
        raise HTTPException(status_code=404, detail="Enrollment not found")

    progress = db.query(models.Progress).filter(
        models.Progress.enrollment_id == enrollment.id
    ).first()

    increment = random.randint(5, 20)
    now_utc = datetime.now(timezone.utc)

    if not progress:
        progress = models.Progress(
            enrollment_id=enrollment.id,
            progress_percentage=min(increment, 100),
            last_updated=now_utc
        )
        db.add(progress)
    else:
        progress.progress_percentage = min(
            progress.progress_percentage + increment,
            100
        )
        progress.last_updated = now_utc

    db.commit()
    db.refresh(progress)

    return progress


# ---------------- TRACK / CHECK PROGRESS ----------------
@router.get("/", response_model=schemas.ProgressResponse)
def get_progress(
    user_id: int,
    course_id: int,
    db: Session = Depends(get_db)
):
    enrollment = db.query(models.Enrollment).filter(
        models.Enrollment.user_id == user_id,
        models.Enrollment.course_id == course_id
    ).first()

    if not enrollment:
        raise HTTPException(status_code=404, detail="Enrollment not found")

    progress = db.query(models.Progress).filter(
        models.Progress.enrollment_id == enrollment.id
    ).first()

    if not progress:
        raise HTTPException(status_code=404, detail="Progress not found")

    return progress
