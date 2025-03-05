import sys
import os
from fastapi import FastAPI

# 📌 Assurer que `app/` est bien reconnu comme un module Python
sys.path.append(os.path.abspath(os.path.dirname(__file__)))

# ✅ Importation correcte des routes
from database import create_db_and_tables
from app.routes.UserRouter import router as auth_router  # ✅ Corrigé

# 🎯 Initialisation de l'application FastAPI
app = FastAPI(title="API de réservation d'événements", version="1.0")

# 📌 Création des tables au démarrage de l'application
@app.on_event("startup")
def startup_event():
    try:
        print("📌 Vérification et création des tables dans PostgreSQL...")
        create_db_and_tables()
        print("✅ Base de données prête !")
    except Exception as e:
        print(f"❌ Erreur lors de la création des tables : {e}")

# 🚀 Inclusion des routes
app.include_router(auth_router, prefix="/auth", tags=["Authentification"])  # ✅ Corrigé

# 🏠 Route d'accueil
@app.get("/")
def home():
    return {"message": "Bienvenue sur l'API de réservation d'événements 🎉"}
