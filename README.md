Mini Learning Management System (Mini LMS)
Project Overview

This project implements a Mini Learning Management System (LMS) using FastAPI for the backend and HTML, CSS, and JavaScript for the frontend.
It allows managing courses, enrolling learners, and tracking learning progress through RESTful APIs.

The project demonstrates clean backend architecture and frontend–backend integration.

Features

User (learner) management

Course management

Enrollment management

Progress tracking per course

RESTful API design

Frontend dashboard using Fetch API

Technology Stack

###Backend
Python
FastAPI
SQLAlchemy
SQLite


### Frontend
- HTML
- CSS
- JavaScript (Fetch API)

### Testing
- pytest
- FastAPI TestClient


PROJECTLMS/
├── app/
│ ├── main.py
│ ├── database.py
│ ├── models.py
│ ├── schemas.py
│ └── routes/
│ ├── users.py
│ ├── courses.py
│ ├── enrollment.py
│ └── progress.py
│
├── frontend/
│ ├── index.html
│ ├── style.css
│ └── script.js
│
├── tests/
│ ├── test_users.py
│ ├── test_enrollment.py
│ └── test_progress.py
│
├── mini_lms.db
├── requirements.txt
├── README.md
└── README.txt

Database Design
User

id

name

email (unique)

Course

id

title

description

Enrollment

user_id

course_id

enrolled_at

Handles many-to-many relationship between users and courses.

Progress

enrollment_id

progress_percentage

last_updated

Tracks progress for each enrolled course.

Application Workflow

Create user

Create course

Enroll user into course

Automatically create progress (0%)

Update progress

View responses via frontend or Swagger

####How to Run the Project :
Step 1: Install Dependencies
pip install -r requirements.txt

Step 2: Run Backend
python -m uvicorn app.main:app --reload

Step 3: Access Backend APIs

Open in browser:

http://127.0.0.1:8000/docs

Running the Frontend
Option 1 (Recommended)

From the frontend folder:

python -m http.server 5500


Open:

http://127.0.0.1:5500/index.html

API Endpoints
Users

POST /users

GET /users

Courses

POST /courses

GET /courses

Enrollments

POST /enrollments

Progress

PUT /progress

Validations

Duplicate user emails are blocked

Enrollment requires valid user and course

Duplicate enrollments prevented

Progress restricted between 0–100

Only enrolled users can update progress

Conclusion

This Mini LMS demonstrates a clean and scalable backend architecture along with a simple yet functional frontend.
It fulfills the requirements of managing courses, enrollments, and learner progress, and serves as a strong foundation for educational platforms.