from database import engine
from sqlmodel import Session
from sqlalchemy import text  # Import de text()

def test_connection():
    try:
        with Session(engine) as session:
            session.execute(text("SELECT 1"))  # Utilisation de text()
        print("✅ Connexion à la base de données réussie !")
    except Exception as e:
        print(f"❌ Erreur de connexion : {e}")

if __name__ == "__main__":
    test_connection()
