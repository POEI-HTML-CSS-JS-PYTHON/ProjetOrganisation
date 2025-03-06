from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List, TYPE_CHECKING
from datetime import datetime


if TYPE_CHECKING:
    from app.models.Reservations import Reservations
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
    