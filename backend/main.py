from fastapi import FastAPI
from dotenv import load_dotenv
from routes.tasks import router as task_router
from routes.auth import router as auth_router
from fastapi.middleware.cors import CORSMiddleware
from fastapi import APIRouter
from contextlib import asynccontextmanager
from db import engine
from sqlmodel import SQLModel
from models.user import User  # Import to register with SQLModel
from models.task import Task  # Import to register with SQLModel

# Load environment variables
load_dotenv()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Create all database tables
    SQLModel.metadata.create_all(engine)
    print("Database tables created successfully")
    yield
    # Shutdown: cleanup if needed

app = FastAPI(
    title="Todo Backend API",
    description="Backend API for Todo application with JWT authentication",
    version="1.0.0",
    lifespan=lifespan
)

# Add CORS middleware to allow requests from frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:3001", "http://127.0.0.1:3001"],  # Allow Next.js dev server
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Include task routes
app.include_router(task_router)

# Include auth routes
app.include_router(auth_router)

@app.get("/")
async def root():
    return {"message": "Welcome to Todo Backend API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
