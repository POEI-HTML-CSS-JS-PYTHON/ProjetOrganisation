from pydantic import BaseModel

class ReservationBase(BaseModel):
    event_id: int
    user_id: int

class ReservationCreate(ReservationBase):
    pass

class Reservation(ReservationBase):
    id: int

    class Config:
        orm_mode = True
