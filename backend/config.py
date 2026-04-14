from pydantic_settings import BaseSettings
from dotenv import load_dotenv

# Load .env file first
load_dotenv()

class Settings(BaseSettings):
    DATABASE_URL: str = ""
    BETTER_AUTH_SECRET: str = "fallback_secret_for_dev"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    class Config:
        env_file = ".env"

settings = Settings()