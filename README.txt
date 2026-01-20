🎓 Mini Learning Management System (Mini LMS)

🚀 Project Overview

This project implements a Mini Learning Management System (LMS) using FastAPI for the backend and HTML, CSS, and JavaScript for the frontend.

✨ It allows:

➜ Managing courses 📚
➜ Enrolling learners 👩‍🎓
➜ Tracking learning progress 📊

The project focuses on clean backend architecture and smooth frontend–backend integration using RESTful APIs.

🌟 Features

✅ User (Learner) Management
✅ Course Management
✅ Enrollment Management
✅ Progress Tracking per Course
✅ RESTful API Design
✅ Frontend Dashboard using Fetch API
✅ Automated API Testing

🛠 Technology Stack

🔧 Backend

➜🐍 Python
➜⚡ FastAPI
➜🗄 SQLAlchemy
➜💾 SQLite

🎨 Frontend

➜🌐 HTML
➜🎨 CSS
➜🧠 JavaScript (Fetch API)

🧪 Testing

➜🧩 pytest
➜🔍 FastAPI TestClient

📂 Project Structure
PROJECTLMS/
│
├── app/
│   ├── main.py              # 🚀 FastAPI app & CORS configration
│   ├── database.py          # 🗄 Database connection
│   ├── models.py            # 📦 SQLAlchemy models
│   ├── schemas.py           # 📄 Pydantic schemas
│   └── routes/
│       ├── users.py         # 👤 User APIs
│       ├── courses.py       # 📚 Course APIs
│       ├── enrollment.py    # 📝 Enrollment APIs
│       └── progress.py      # 📊 Progress APIs
│
├── frontend/
│   ├── index.html           # 🖥 UI layout
│   ├── style.css            # 🎨 Styling
│   └── script.js            # 🔗 Fetch API logic
│
├── tests/
│   ├── test_users.py        # 🧪 User tests
│   ├── test_enrollment.py   # 🧪 Enrollment tests
│   └── test_progress.py     # 🧪 Progress tests
│
├── mini_lms.db              # 💾 SQLite database
├── requirements.txt         # 📦 Dependencies
├── README.md
└── README.txt

🗄 Database Design

👤 User

➜id
➜name
➜email (unique)

📚 Course

➜id
➜title
➜description

📝 Enrollment

➜user_id
➜course_id
➜enrolled_at

➡️ Handles many-to-many relationship between users and courses.

📊 Progress

➜enrollment_id
➜progress_percentage
➜last_updated

➡️ Tracks progress for each enrolled course.

🔄 Application Workflow

1️⃣ Create user 👤
2️⃣ Create course 📚
3️⃣ Enroll user into course 📝
4️⃣ Automatically create progress (0%) 📊
5️⃣ Update progress 🔄
6️⃣ View responses via frontend or Swagger UI 🌐

▶️ How to Run the Project

🔹 Step 1: Install Dependencies

pip install -r requirements.txt


🔹 Step 2: Run Backend

python -m uvicorn app.main:app --reload


🔹 Step 3: Access Backend APIs
Open in browser:

http://127.0.0.1:8000/docs

🌐 Running the Frontend

➜From the frontend folder:

python -m http.server 5500

➜Open in browser:

http://127.0.0.1:5500/index.html

🔗 API Endpoints

👤 Users

➜POST /users
➜GET /users

📚 Courses

➜POST /courses
➜GET /courses

📝 Enrollments

➜POST /enrollments

📊 Progress

➜PUT /progress

✅ Validations

✔ Duplicate user emails are blocked
✔ Enrollment requires valid user and course
✔ Duplicate enrollments are prevented
✔ Progress restricted between 0–100
✔ Only enrolled users can update progress

🏁 Conclusion

This Mini LMS demonstrates a clean, scalable backend architecture combined with a simple yet effective frontend.

🎯 It fulfills core LMS requirements and serves as a strong foundation for:

➜Educational platforms
➜Academic projects
➜Backend/API portfolio demonstrations