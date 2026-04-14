from pydantic_settings import BaseSettings
from pathlib import Path

class Settings(BaseSettings):
    DATABASE_URL: str = ""
    BETTER_AUTH_SECRET: str = "fallback_secret_for_dev"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    class Config:
        env_file = str(Path(__file__).parent / ".env")
        env_file_encoding = "utf-8"

settings = Settings()

# Debug: print the DATABASE_URL
import sys
print(f"DEBUG: DATABASE_URL = {repr(settings.DATABASE_URL)}", file=sys.stderr)