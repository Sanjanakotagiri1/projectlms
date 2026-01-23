from fastapi.testclient import TestClient
from app.main import app
import uuid

client = TestClient(app)

def test_enrollment_and_duplicate():
    user = client.post("/users", json={
        "name": "Enroll User",
        "email": f"enroll_{uuid.uuid4()}@example.com"
    }).json()

    course = client.post("/courses", json={
        "title": f"Course {uuid.uuid4()}",
        "description": "Testing"
    }).json()

    enroll_response = client.post("/enrollments", json={
        "user_id": user["id"],
        "course_id": course["id"]
    })

    assert enroll_response.status_code == 200

    duplicate_response = client.post("/enrollments", json={
        "user_id": user["id"],
        "course_id": course["id"]
    })

    assert duplicate_response.status_code == 400