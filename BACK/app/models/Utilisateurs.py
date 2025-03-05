from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    email: str = Field(unique=True, nullable=False)
    password: str = Field(nullable=False)
    role: str = Field(default="participant")

    reservations: List["Reservations"] = Relationship(back_populates="user")
