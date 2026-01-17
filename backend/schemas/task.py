from pydantic import BaseModel
<<<<<<< HEAD
from typing import Optional, List
from datetime import datetime
from enum import Enum

class TaskStatus(str, Enum):
    all = "all"
    pending = "pending"
    completed = "completed"

class TaskSort(str, Enum):
    created = "created"
    title = "title"
    due_date = "due_date"

class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None

    class Config:
        json_schema_extra = {
            "example": {
                "title": "Sample task",
                "description": "Task description"
            }
        }

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    completed: Optional[bool] = None

    class Config:
        json_schema_extra = {
            "example": {
                "title": "Updated task title",
                "description": "Updated description",
                "completed": True
            }
        }

class TaskResponse(BaseModel):
    id: int
=======
from typing import List, Optional, Generic, TypeVar
from datetime import datetime
from models.task import Task

T = TypeVar('T')

class TaskResponse(BaseModel):
    id: str
>>>>>>> 3472c09df4920281bb81456aab4e032e839461c6
    user_id: str
    title: str
    description: Optional[str]
    completed: bool
    created_at: datetime
    updated_at: datetime

    class Config:
<<<<<<< HEAD
        json_schema_extra = {
            "example": {
                "id": 1,
                "user_id": "user123",
                "title": "Sample task",
                "description": "Task description",
                "completed": False,
                "created_at": "2023-01-01T00:00:00Z",
                "updated_at": "2023-01-01T00:00:00Z"
            }
        }

class TaskListResponse(BaseModel):
    success: bool
    data: List[TaskResponse]

    class Config:
        json_schema_extra = {
            "example": {
                "success": True,
                "data": [
                    {
                        "id": 1,
                        "user_id": "user123",
                        "title": "Sample task",
                        "description": "Task description",
                        "completed": False,
                        "created_at": "2023-01-01T00:00:00Z",
                        "updated_at": "2023-01-01T00:00:00Z"
                    }
                ]
            }
        }

class TaskSingleResponse(BaseModel):
    success: bool
    data: TaskResponse

    class Config:
        json_schema_extra = {
            "example": {
                "success": True,
                "data": {
                    "id": 1,
                    "user_id": "user123",
                    "title": "Sample task",
                    "description": "Task description",
                    "completed": False,
                    "created_at": "2023-01-01T00:00:00Z",
                    "updated_at": "2023-01-01T00:00:00Z"
                }
            }
        }

class SuccessResponse(BaseModel):
    success: bool

    class Config:
        json_schema_extra = {
            "example": {
                "success": True
            }
        }

class ErrorResponse(BaseModel):
    success: bool
    error: dict

    class Config:
        json_schema_extra = {
            "example": {
                "success": False,
                "error": {
                    "code": "AUTH_001",
                    "message": "Missing or invalid authorization token"
                }
            }
        }
=======
        from_attributes = True

class TaskListResponse(BaseModel):
    tasks: List[TaskResponse]

class ApiResponse(BaseModel, Generic[T]):
    success: bool
    data: Optional[T] = None
    error: Optional[str] = None
    message: Optional[str] = None
>>>>>>> 3472c09df4920281bb81456aab4e032e839461c6
