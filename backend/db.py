from sqlmodel import create_engine, Session
from typing import Generator
import os
from dotenv import load_dotenv
<<<<<<< HEAD
from config import settings

load_dotenv()

# Create database engine
if settings.DATABASE_URL.startswith("sqlite"):
    engine = create_engine(
        settings.DATABASE_URL,
        echo=True,
        connect_args={"check_same_thread": False}
    )
else:
    engine = create_engine(settings.DATABASE_URL, echo=True)
=======

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set")

# Add connect_args for SQLite compatibility
if DATABASE_URL.startswith("sqlite"):
    engine = create_engine(DATABASE_URL, echo=True, connect_args={"check_same_thread": False})
else:
    engine = create_engine(DATABASE_URL, echo=True)
>>>>>>> 3472c09df4920281bb81456aab4e032e839461c6

def get_session() -> Generator[Session, None, None]:
    with Session(engine) as session:
        yield session