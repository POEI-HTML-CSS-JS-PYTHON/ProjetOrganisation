from fastapi import HTTPException, Depends, Request
import jwt
import os
from dotenv import load_dotenv
from database import get_db
from sqlmodel import Session, select
from app.models.Utilisateurs import User

# Charger les variables d'environnement
load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY", "supersecretkey")  # Clé secrète pour JWT
ALGORITHM = "HS256"

def get_current_user(request: Request, db: Session = Depends(get_db)):
    """
    Vérifie si l'utilisateur est authentifié en récupérant et validant son token JWT stocké dans un cookie.
    """
    # 1️⃣ Récupérer le cookie `access_token`
    token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(status_code=401, detail="Non authentifié")  # Pas de token = accès refusé
    
    # 2️⃣ Supprimer le préfixe "Bearer " si présent
    token = token.replace("Bearer ", "")

    try:
        # 3️⃣ Décoder le token JWT
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")  # Récupérer l'email du payload JWT
        
        # 4️⃣ Vérifier que l'utilisateur existe en base de données
        user = db.exec(select(User).where(User.email == email)).first()
        if not user:
            raise HTTPException(status_code=401, detail="Utilisateur non trouvé")

        return user  # ✅ Retourne l'utilisateur s'il est valide

    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expiré")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Token invalide")
