from fastapi.testclient import TestClient
from app.main import app
import uuid

client = TestClient(app)

def test_invalid_progress():
    user = client.post("/users", json={
        "name": "Progress User",
        "email": f"progress_{uuid.uuid4()}@example.com"
    }).json()

    course = client.post("/courses", json={
        "title": f"Progress Course {uuid.uuid4()}",
        "description": "Testing progress"
    }).json()

    client.post("/enrollments", json={
        "user_id": user["id"],
        "course_id": course["id"]
    })

    response = client.put("/progress", json={
        "user_id": user["id"],
        "course_id": course["id"],
        "progress": 150
    })

    assert response.status_code == 400
