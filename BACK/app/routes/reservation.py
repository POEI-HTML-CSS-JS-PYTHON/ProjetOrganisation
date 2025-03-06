from fastapi import FastAPI, HTTPException, Depends, APIRouter
from sqlalchemy.orm import Session
from app import models,schemas,crud
from database import SessionLocal, engine

app = FastAPI()

router = APIRouter()

# Dépendance pour obtenir la session de la base de données
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/reservations/", response_model=schemas.Reservation)
def creer_reservation(reservation: schemas.ReservationCreate, db: Session = Depends(get_db)):
    # Vérifier si l'événement existe et a des places disponibles
    evenement = db.query(models.Evenement).filter(models.Evenement.id == reservation.id_evenement).first()
    if not evenement:
        raise HTTPException(status_code=404, detail="Événement non trouvé")
    if evenement.places_disponibles <= 0:
        raise HTTPException(status_code=400, detail="Plus de places disponibles")

    # Créer la réservation
    db_reservation = models.Reservation(**reservation.dict())
    db.add(db_reservation)
    db.commit()
    db.refresh(db_reservation)

    # Mettre à jour les places disponibles
    evenement.places_disponibles -= 1
    db.commit()

    return db_reservation