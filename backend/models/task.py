from sqlmodel import SQLModel, Field, Column, DateTime, create_engine
from datetime import datetime
import uuid
from typing import Optional

def generate_uuid():
    return str(uuid.uuid4())

class TaskBase(SQLModel):
    title: str = Field(min_length=1, max_length=255)
    description: Optional[str] = Field(default=None)
    completed: bool = Field(default=False)

class Task(TaskBase, table=True):
    id: str = Field(default_factory=generate_uuid, primary_key=True, nullable=False)
    user_id: str = Field(index=True)  # Index for performance
    created_at: datetime = Field(sa_column=Column(DateTime, default=datetime.utcnow))
    updated_at: datetime = Field(sa_column=Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow))

class TaskCreate(TaskBase):
    pass

class TaskUpdate(TaskBase):
    title: Optional[str] = Field(default=None, min_length=1, max_length=255)
    description: Optional[str] = Field(default=None)
    completed: Optional[bool] = Field(default=None)

class TaskCompleteUpdate(SQLModel):
    completed: bool