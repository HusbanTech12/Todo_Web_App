from pydantic_settings import BaseSettings
import os
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    DATABASE_URL: str = os.getenv("DATABASE_URL", "")
    BETTER_AUTH_SECRET: str = os.getenv("BETTER_AUTH_SECRET", "fallback_secret_for_dev")
<<<<<<< HEAD
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
=======
    ALGORITHM: str = os.getenv("ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))
>>>>>>> 3472c09df4920281bb81456aab4e032e839461c6

    class Config:
        env_file = ".env"

settings = Settings()