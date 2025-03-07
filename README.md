# 🎭 Gestion des Événements - Projet Web

## 🚀 Présentation

Ce projet est une application web permettant de gérer des événements en ligne.  
L'application dispose d'une **authentification avec rôles** (administrateur, participant) et permet la gestion des événements via une interface simple.

## 🌐 **Compatibilité Navigateur**

⚠ **Important : Ce projet fonctionne uniquement sur Mozilla Firefox.**  
En raison d'une **gestion spécifique des tokens** que nous n'avons pas encore eu le temps d'implémenter sur les autres navigateurs, l'utilisation de **Google Chrome, Edge, Safari ou Opera** peut causer des erreurs d'authentification.

---

## 📌 **Fonctionnalités**

### ✅ **1. Page de Test - `/`**

- Page accessible pour tester la connexion avec le backend.
- Permet de **s'inscrire, se connecter, voir les infos de l'utilisateur et se déconnecter**.

### ✅ **2. Création d'un Administrateur - `/admin.html`**

- Cette page permet de **créer un compte administrateur**.
- Un **administrateur** a le droit d'ajouter des événements.

### ✅ **3. Liste des Événements - `/events.html`**

- **Tout le monde** peut accéder à cette page, même sans être connecté.
- Affiche **tous les événements existants**.
- **En cliquant sur un événement**, on accède à ses **détails** (`event-detail.html`).

### ✅ **4. Détails d'un Événement - `/event-detail.html?id=XX`**

- Affiche toutes les informations détaillées d'un événement sélectionné.

### ✅ **5. Ajout d'Événement (Administrateur uniquement) - `/add-event.html`**

- **Seuls les administrateurs** peuvent créer un événement.
- **Les participants** ne peuvent **pas ajouter** d'événement.

---
