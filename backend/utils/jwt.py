from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from config import settings

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)

    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.BETTER_AUTH_SECRET, algorithm=settings.ALGORITHM)
    return encoded_jwt

def verify_token(token: str):
    try:
        payload = jwt.decode(
            token,
            settings.BETTER_AUTH_SECRET,
            algorithms=[settings.ALGORITHM]
        )
        user_id: str = payload.get("sub")
        if user_id is None:
            return None
        return user_id
    except JWTError:
        return None

def extract_user_id_from_token(token: str) -> Optional[str]:
    """
    Extract user_id from JWT token
    """
    payload = verify_token(token)
    if payload:
        # Assuming the user_id is stored in the 'sub' claim or 'user_id' claim
        # Adjust this based on how Better Auth structures the JWT
        user_id = payload.get('sub') or payload.get('user_id')
        return user_id
    return None
