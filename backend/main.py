<<<<<<< HEAD
from fastapi import FastAPI
from dotenv import load_dotenv
from routes.tasks import router as task_router

# Load environment variables
load_dotenv()

app = FastAPI(
    title="Todo Backend API",
    description="Backend API for Todo application with JWT authentication",
    version="1.0.0"
)

# Include task routes
app.include_router(task_router)

@app.get("/")
async def root():
    return {"message": "Welcome to Todo Backend API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
=======
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException
from routes import tasks
from routes import health
from routes import auth
from config import settings
from sqlmodel import SQLModel
from db import engine
from models.base import Base

app = FastAPI(title="Todo Backend API", version="1.0.0")

# Exception handlers
@app.exception_handler(StarletteHTTPException)
async def custom_http_exception_handler(request: Request, exc: StarletteHTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail}
    )

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=422,
        content={
            "detail": "Validation error",
            "errors": [
                {
                    "loc": error["loc"],
                    "msg": error["msg"],
                    "type": error["type"]
                } for error in exc.errors()
            ]
        }
    )

@app.exception_handler(Exception)
async def generic_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error"}
    )

# Include routers
app.include_router(tasks.router, prefix="/api", tags=["tasks"])
app.include_router(health.router, prefix="/api", tags=["health"])
app.include_router(auth.router, prefix="/api", tags=["auth"])

@app.on_event("startup")
def on_startup():
    # Create database tables
    from models.user import User  # Import user model to register it with SQLModel
    SQLModel.metadata.create_all(bind=engine)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
>>>>>>> 3472c09df4920281bb81456aab4e032e839461c6
