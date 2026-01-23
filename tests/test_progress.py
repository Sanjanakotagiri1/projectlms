from fastapi.testclient import TestClient
from app.main import app
import uuid

client = TestClient(app)
def test_generate_progress():
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

    response = client.post("/progress", json={
        "user_id": user["id"],
        "course_id": course["id"]
    })

    assert response.status_code == 200
    assert 0 <= response.json()["progress_percentage"] <= 100
