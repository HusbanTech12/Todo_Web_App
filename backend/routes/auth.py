from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session
from db import get_session
from models.user import User, UserCreate, hash_password
from utils.jwt import create_access_token
from datetime import timedelta
from typing import Dict, Any, Optional
from pydantic import BaseModel

class UserLogin(BaseModel):
    email: str
    password: str

# Define response models
class ApiResponse(BaseModel):
    success: bool
    data: Optional[Dict[str, Any]] = None
    message: Optional[str] = None
    error: Optional[str] = None

class UserResponse(BaseModel):
    id: str
    email: str
    createdAt: str
    updatedAt: str

router = APIRouter(prefix="/api/auth", tags=["auth"])

@router.post("/register", response_model=ApiResponse)
def register_user(user_data: UserCreate, session: Session = Depends(get_session)):
    # Check if user already exists
    existing_user = session.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exists"
        )

    # Hash the password
    hashed_password = user_data.hash_password()

    # Create new user
    user = User(
        email=user_data.email,
        hashed_password=hashed_password
    )

    session.add(user)
    session.commit()
    session.refresh(user)

    # Create access token
    access_token_expires = timedelta(minutes=30)
    token_data = {"sub": user.id}
    access_token = create_access_token(data=token_data, expires_delta=access_token_expires)

    return ApiResponse(
        success=True,
        data={
            "token": access_token,
            "user": {
                "id": user.id,
                "email": user.email,
                "createdAt": user.created_at.isoformat(),
                "updatedAt": user.updated_at.isoformat()
            }
        },
        message="User registered successfully"
    )


@router.post("/login", response_model=ApiResponse)
def login_user(login_data: UserLogin, session: Session = Depends(get_session)):
    # Find user by email
    user = session.query(User).filter(User.email == login_data.email).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )

    # Verify password
    from passlib.context import CryptContext
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

    if not pwd_context.verify(login_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )

    # Create access token
    access_token_expires = timedelta(minutes=30)
    token_data = {"sub": user.id}
    access_token = create_access_token(data=token_data, expires_delta=access_token_expires)

    return ApiResponse(
        success=True,
        data={
            "token": access_token,
            "user": {
                "id": user.id,
                "email": user.email,
                "createdAt": user.created_at.isoformat(),
                "updatedAt": user.updated_at.isoformat()
            }
        },
        message="Login successful"
    )


@router.post("/logout", response_model=ApiResponse)
def logout_user():
    # In a real app, you might want to blacklist the token
    # For now, just return success
    return ApiResponse(
        success=True,
        message="Logged out successfully"
    )