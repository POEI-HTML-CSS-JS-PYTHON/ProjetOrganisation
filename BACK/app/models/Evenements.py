from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
from datetime import datetime

class Evenements(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str = Field(nullable=False)
    description: str
    date_debut: datetime
    date_fin: datetime
    lieu: str
    capacite: int
    organizer_id: int = Field(foreign_key="user.id")

    reservations: List["Reservations"] = Relationship(back_populates="evenement")
