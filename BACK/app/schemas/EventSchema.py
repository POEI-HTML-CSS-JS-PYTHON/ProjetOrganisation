from pydantic import BaseModel
from datetime import datetime
from typing import Optional

# ✅ 1️⃣ Schéma pour créer un événement
class EventCreate(BaseModel):
    title: str
    description: Optional[str] = None
    date_debut: datetime
    date_fin: datetime
    lieu: str
    capacite: int

# ✅ 2️⃣ Schéma pour mettre à jour un événement (tous les champs sont optionnels)
class EventUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    date_debut: Optional[datetime] = None
    date_fin: Optional[datetime] = None
    lieu: Optional[str] = None
    capacite: Optional[int] = None
    organizer_id: Optional[int] = None
