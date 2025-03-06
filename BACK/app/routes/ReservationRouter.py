from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import Session, select
from database import get_db
from app.models.Reservations import Reservations
from app.models.Evenements import Evenements
from app.models.Utilisateurs import User
from app.schemas.ReservationSchema import ReservationCreate
from app.dependencies import get_current_user
from typing import List

router = APIRouter()

# ✅ 1️⃣ Réserver un événement
@router.post("/", response_model=Reservations)
def create_reservation(
    reservation: ReservationCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)  # 🔒 Seul un utilisateur connecté peut réserver
):
    event = db.get(Evenements, reservation.evenement_id)
    if not event:
        raise HTTPException(status_code=404, detail="Événement non trouvé")

    # Vérifier si l'événement est complet
    existing_reservations = db.exec(
        select(Reservations).where(Reservations.evenement_id == event.id)
    ).all()

    if len(existing_reservations) >= event.capacite:
        raise HTTPException(status_code=400, detail="L'événement est complet")

    new_reservation = Reservations(
        utilisateur_id=current_user.id,
        evenement_id=reservation.evenement_id,
        date_de_reservation=reservation.date_de_reservation,
        status="confirmée"  # Par défaut, la réservation est confirmée
    )

    db.add(new_reservation)
    db.commit()
    db.refresh(new_reservation)
    return new_reservation


# ✅ 2️⃣ Lister toutes les réservations (Admin uniquement)
@router.get("/", response_model=List[Reservations])
def list_reservations(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Seul un admin peut voir toutes les réservations
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Accès interdit")

    return db.exec(select(Reservations)).all()


# ✅ 3️⃣ Lister les réservations de l'utilisateur connecté
@router.get("/me", response_model=List[Reservations])
def list_my_reservations(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return db.exec(
        select(Reservations).where(Reservations.utilisateur_id == current_user.id)
    ).all()


# ✅ 4️⃣ Supprimer une réservation (seul le créateur peut la supprimer)
@router.delete("/{reservation_id}")
def delete_reservation(
    reservation_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    reservation = db.get(Reservations, reservation_id)
    if not reservation:
        raise HTTPException(status_code=404, detail="Réservation non trouvée")

    if reservation.utilisateur_id != current_user.id:
        raise HTTPException(status_code=403, detail="Vous ne pouvez supprimer que vos propres réservations")

    db.delete(reservation)
    db.commit()
    return {"message": "Réservation annulée avec succès"}
