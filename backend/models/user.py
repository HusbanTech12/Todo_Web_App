from sqlmodel import SQLModel, Field
from datetime import datetime
import uuid
from typing import Optional
from sqlalchemy import Column, DateTime
from passlib.context import CryptContext
from sqlalchemy import String

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def generate_uuid():
    return str(uuid.uuid4())

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

class UserBase(SQLModel):
    email: str = Field(unique=True, index=True)

class User(UserBase, table=True):
    id: str = Field(default_factory=generate_uuid, primary_key=True, nullable=False)
    hashed_password: str = Field(sa_column=Column(String, nullable=False))
    created_at: datetime = Field(sa_column=Column(DateTime, default=datetime.utcnow))
    updated_at: datetime = Field(sa_column=Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow))

class UserCreate(UserBase):
    password: str = Field(min_length=6)

    def hash_password(self):
        return hash_password(self.password)

class UserPublic(UserBase):
    id: str
    created_at: datetime
    updated_at: datetime