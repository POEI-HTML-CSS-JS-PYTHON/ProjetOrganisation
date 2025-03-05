from database import create_db_and_tables

if __name__ == "__main__":
    print("📌 Création des tables dans PostgreSQL...")
    create_db_and_tables()
    print("✅ Base de données prête !")
