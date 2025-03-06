import sys
import os
from fastapi import FastAPI
from contextlib import asynccontextmanager
 
# 📌 Assurer que `app/` est bien reconnu comme un module Python
sys.path.append(os.path.abspath(os.path.dirname(__file__)))
 
# 🎯 Nouveau gestionnaire `lifespan` au lieu de `@app.on_event`
@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        print("📌 Vérification et création des tables dans PostgreSQL...")
        create_db_and_tables()
        print("✅ Base de données prête !")
    except Exception as e:
        print(f"❌ Erreur lors de la création des tables : {e}")
    yield  # Permet de continuer l'exécution de l'application après cette étape
 
# 🎯 Initialisation de l'application FastAPI avec `lifespan`
app = FastAPI(title="API de réservation d'événements", version="1.0", lifespan=lifespan)
 
# ✅ Importation correcte des routes
from database import create_db_and_tables
from app.routes.UserRouter import router as auth_router
from app.routes.reservation import router as reservation_router
# 🚀 Inclusion des routes
app.include_router(auth_router, prefix="/auth", tags=["Authentification"])  
app.include_router(reservation_router, prefix="/res", tags =["Réservation"])
# 🏠 Route d'accueil
@app.get("/")
def home():
    return {"message": "Bienvenue sur l'API de réservation d'événements 🎉"}