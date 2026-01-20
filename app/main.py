from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from app.database import engine
from app.models import Base


from app.routes import users, courses, enrollment, progress

app = FastAPI()

Base.metadata.create_all(bind=engine, checkfirst=True)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def redirect_to_docs():
    return RedirectResponse(url="/docs")

app.include_router(users.router)
app.include_router(courses.router)
app.include_router(enrollment.router)
app.include_router(progress.router)
