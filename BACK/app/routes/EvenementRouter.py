from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import Session, select
from database import get_db
from app.models.Evenements import Evenements
from app.schemas.EventSchema import EventCreate, EventUpdate
from app.dependencies import get_current_user
from app.models.Utilisateurs import User  # Pour typer l'utilisateur authentifié
from typing import List

router = APIRouter()

# ✅ 1️⃣ Créer un événement (seulement pour les utilisateurs connectés)
@router.post("/", response_model=Evenements)
def create_evenement(
    event: EventCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)  # 🔒 Vérifie le token JWT
):

 if current_user.role not in ["admin", "organisateur"]:
        raise HTTPException(status_code=403, detail="Accès interdit : Seuls les administrateurs et les organisateurs peuvent créer un événement.")

    new_event = Evenements(**event.dict(), organizer_id=current_user.id)
    db.add(new_event)
    db.commit()
    db.refresh(new_event)
    return new_event


# ✅ 2️⃣ Lister tous les événements
@router.get("/", response_model=List[Evenements])
def list_evenements(db: Session = Depends(get_db)):
    return db.exec(select(Evenements)).all()

# ✅ 3️⃣ Récupérer un événement spécifique par ID
@router.get("/{event_id}", response_model=Evenements)
def get_evenement(event_id: int, db: Session = Depends(get_db)):
    event = db.get(Evenements, event_id)
    if not event:
        raise HTTPException(status_code=404, detail="Événement non trouvé")
    return event

# ✅ 4️⃣ Modifier un événement (seulement par l'organisateur)
@router.put("/{event_id}", response_model=Evenements)
def update_evenement(
    event_id: int,
    event_update: EventUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)  # 🔒 Vérification JWT
):
    event = db.get(Evenements, event_id)
    if not event:
        raise HTTPException(status_code=404, detail="Événement non trouvé")

    # 🔒 Vérifier si l'utilisateur est l'organisateur
    if event.organizer_id != current_user.id:
        raise HTTPException(status_code=403, detail="Accès interdit : Vous n'êtes pas l'organisateur de cet événement.")

    event_data = event_update.dict(exclude_unset=True)
    for key, value in event_data.items():
        setattr(event, key, value)

    db.add(event)
    db.commit()
    db.refresh(event)
    return event


# ✅ 5️⃣ Supprimer un événement
# ✅ 5️⃣ Supprimer un événement (seulement par l'organisateur)
@router.delete("/{event_id}")
def delete_evenement(
    event_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)  # 🔒 Vérification JWT
):
    event = db.get(Evenements, event_id)
    if not event:
        raise HTTPException(status_code=404, detail="Événement non trouvé")

    # 🔒 Vérifier si l'utilisateur est bien l'organisateur
    if event.organizer_id != current_user.id:
        raise HTTPException(status_code=403, detail="Accès interdit : Vous n'êtes pas l'organisateur de cet événement.")

    db.delete(event)
    db.commit()
    return {"message": "Événement supprimé avec succès"}

