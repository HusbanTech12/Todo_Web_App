from sqlmodel import SQLModel, Field, Column
from datetime import datetime
from typing import Optional
from enum import Enum

class TaskStatus(str, Enum):
    all = "all"
    pending = "pending"
    completed = "completed"

class TaskSort(str, Enum):
    created = "created"
    title = "title"
    due_date = "due_date"

class TaskBase(SQLModel):
    title: str = Field(nullable=False)
    description: Optional[str] = Field(default=None)
    completed: bool = Field(default=False)
    user_id: str = Field(index=True)

class Task(TaskBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)
    updated_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)

class TaskCreate(TaskBase):
    title: str
    pass

class TaskUpdate(SQLModel):
    title: Optional[str] = None
    description: Optional[str] = None
    completed: Optional[bool] = None

class TaskResponse(TaskBase):
    id: int
    created_at: datetime
    updated_at: datetime
