from sqlmodel import SQLModel, Field, Relationship
from typing import Optional
from datetime import datetime

class Reservations(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    utilisateur_id: int = Field(foreign_key="user.id")
    evenement_id: int = Field(foreign_key="evenements.id")
    date_de_reservation: datetime
    status: str = Field(default="confirmed")

    user: Optional["User"] = Relationship(back_populates="reservations")
    evenement: Optional["Evenements"] = Relationship(back_populates="reservations")
