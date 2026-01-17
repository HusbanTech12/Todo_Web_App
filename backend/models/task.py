<<<<<<< HEAD
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
=======
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
>>>>>>> 3472c09df4920281bb81456aab4e032e839461c6
