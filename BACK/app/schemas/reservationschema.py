from pydantic import BaseModel
from datetime import datetime

class ReservationBase(BaseModel):
    utilisateur_id: int 
    evenement_id: int
    status: str = "confirmé"  # Valeur par défaut
    date_de_reservation: datetime
class ReservationCreate(ReservationBase):
    pass  # Vous pouvez ajouter des validations supplémentaires ici si nécessaire

class Reservation(ReservationBase):
    id: int  # Identifiant unique de la réservation
    class Config:
        from_attributes = True  # Permet la conversion depuis un modèle SQLAlchemy