from fastapi.testclient import TestClient
from app.main import app
import uuid

client = TestClient(app)

def test_create_user():
    email = f"user_{uuid.uuid4()}@example.com"

    response = client.post("/users", json={
        "name": "Test User",
        "email": email
    })

    assert response.status_code == 200
    data = response.json()
    assert "id" in data
    assert data["email"] == email
