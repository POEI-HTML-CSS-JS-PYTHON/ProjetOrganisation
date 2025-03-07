from fastapi import APIRouter, HTTPException, Depends, Response
from sqlmodel import Session, select
from passlib.context import CryptContext
from datetime import datetime, timedelta
import jwt
import os
from dotenv import load_dotenv
from database import get_db
from app.models.Utilisateurs import User
from app.schemas import Token, UserCreate, UserLogin, UserRoleUpdate
from app.dependencies import get_current_user

# Charger les variables d'environnement
load_dotenv()

# Secret JWT
SECRET_KEY = os.getenv("SECRET_KEY", "supersecretkey")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

# Cryptage des mots de passe
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

router = APIRouter()

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: timedelta):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# Route d'inscription
@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.exec(select(User).where(User.email == user.email)).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email déjà utilisé")

    hashed_password = hash_password(user.password)
    new_user = User(email=user.email, password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "Utilisateur créé avec succès"}

# Route de connexion
@router.post("/login")
def login(user: UserLogin, response: Response, db: Session = Depends(get_db)):
    db_user = db.exec(select(User).where(User.email == user.email)).first()
    if not db_user or not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=401, detail="Identifiants incorrects")

    access_token = create_access_token(
        data={"sub": db_user.email},
        expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )

    IS_LOCAL = os.getenv("ENV", "local") == "local"  # ✅ Change "prod" en production

    response.set_cookie(
        key="access_token",
        value=f"Bearer {access_token}",
        httponly=True,
        samesite=None,
        secure=not IS_LOCAL,  # ✅ False en local, True en production
        max_age=ACCESS_TOKEN_EXPIRE_MINUTES * 60,  # ✅ Expiration en secondes
        path="/"  # ✅ Pour s’assurer que le cookie est accessible partout
    )

    return {"message": "Connexion réussie"}


# Route de déconnexion
@router.post("/logout")
def logout(response: Response):
    print("✅ Déconnexion demandée, suppression du cookie...")

    response.delete_cookie(
        key="access_token",
        path="/",
        domain=None,  
        samesite="None",
        secure=False 
    )

    return {"message": "Déconnexion réussie"}



@router.get("/me")
def get_me(current_user: User = Depends(get_current_user)):
     return {
        "id": current_user.id,
        "email": current_user.email,
        "role": current_user.role,
        "reservations": [
            {
                "id": r.id,
                "event_id": r.event_id,
                "date_reservation": r.date_reservation,
                "status": r.status  # Exemple : confirmé / en attente
            } for r in reservations
        ]
    }


from app.schemas.UserSchema import UserRoleUpdate

@router.patch("/{user_id}/role")
def update_user_role(
    user_id: int,
    role_update: UserRoleUpdate,  # ✅ Maintenant, `new_role` est dans le body
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Vérifier que l'utilisateur est admin
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Accès refusé : seul un administrateur peut modifier un rôle")

    user = db.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="Utilisateur non trouvé")

    if role_update.new_role not in ["participant", "organisateur", "admin"]:
        raise HTTPException(status_code=400, detail="Rôle invalide")

    user.role = role_update.new_role  # ✅ Mise à jour du rôle
    db.add(user)
    db.commit()
    db.refresh(user)
    return {"message": f"Le rôle de {user.email} a été mis à jour en {role_update.new_role}"}

@router.post("/create-admin")
def create_admin_user(user: UserCreate, db: Session = Depends(get_db)):
    """Création d'un utilisateur avec un rôle spécifique (réservé aux devs)"""

    existing_user = db.exec(select(User).where(User.email == user.email)).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email déjà utilisé")

    if user.role not in ["participant", "organisateur", "admin"]:
        raise HTTPException(status_code=400, detail="Rôle invalide")

    hashed_password = hash_password(user.password)
    new_user = User(email=user.email, password=hashed_password, role=user.role)

    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return f"Utilisateur : {user.email} créé avec le rôle {user.role} 🎉"
