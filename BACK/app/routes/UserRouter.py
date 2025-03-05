from fastapi import APIRouter, HTTPException, Depends, Response
from sqlmodel import Session, select
from passlib.context import CryptContext
from datetime import datetime, timedelta
import jwt
import os
from dotenv import load_dotenv
from database import get_db
from app.models.Utilisateurs import User
from app.schemas import Token, UserCreate, UserLogin
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

    access_token = create_access_token(data={"sub": db_user.email}, expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))

    response.set_cookie(
        key="access_token",
        value=f"Bearer {access_token}",
        httponly=True,
        max_age=ACCESS_TOKEN_EXPIRE_MINUTES * 60
    )

    return {"message": "Connexion réussie"}

# Route de déconnexion
@router.post("/logout")
def logout(response: Response):
    response.delete_cookie("access_token")
    return {"message": "Déconnexion réussie"}

@router.get("/me")
def get_me(current_user: User = Depends(get_current_user)):
    return {"email": current_user.email, "role": current_user.role}
