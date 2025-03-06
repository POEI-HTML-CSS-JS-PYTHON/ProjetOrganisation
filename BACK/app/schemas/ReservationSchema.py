from pydantic import BaseModel
from datetime import datetime

class ReservationCreate(BaseModel):
    evenement_id: int
    date_de_reservation: datetime
