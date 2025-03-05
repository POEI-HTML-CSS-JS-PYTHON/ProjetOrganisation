from sqlmodel import SQLModel, create_engine, Session
import os
from dotenv import load_dotenv

from app.models.Utilisateurs import User
from app.models.Evenements import Evenements
from app.models.Reservations import Reservations



load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL, echo=True)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

def get_db():
    with Session(engine) as session:
        yield session
