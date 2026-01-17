from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
<<<<<<< HEAD
from typing import Dict, Optional
from utils.jwt import extract_user_id_from_token
=======
from typing import Optional
from utils.jwt import verify_token
>>>>>>> 3472c09df4920281bb81456aab4e032e839461c6

security = HTTPBearer()

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> str:
<<<<<<< HEAD
    """
    Dependency to get current user from JWT token
    Returns user_id if token is valid, raises 401 if invalid
    """
    token = credentials.credentials

    user_id = extract_user_id_from_token(token)
    if user_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
=======
    token = credentials.credentials
    user_id = verify_token(token)

    if user_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
>>>>>>> 3472c09df4920281bb81456aab4e032e839461c6
            headers={"WWW-Authenticate": "Bearer"},
        )

    return user_id