document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("eventForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      createEvent();
    });
});

// ✅ Créer un nouvel événement
async function createEvent() {
  console.log("🟢 Tentative de création d'un événement...");

  // 🔥 Vérifie si l'utilisateur est connecté avant d'envoyer l'événement
  const isAuthenticated = await getAuthToken();
  if (!isAuthenticated) {
    console.error("❌ Vous devez être connecté !");
    document.getElementById("message").textContent =
      "❌ Vous devez être connecté pour ajouter un événement.";
    return;
  }

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const date_debut = document.getElementById("date_debut").value;
  const date_fin = document.getElementById("date_fin").value;
  const lieu = document.getElementById("lieu").value;
  const capacite = parseInt(document.getElementById("capacite").value);

  fetch("http://127.0.0.1:8000/evenements/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // 🔥 Important pour que le backend reçoive les cookies
    body: JSON.stringify({
      title,
      description,
      date_debut,
      date_fin,
      lieu,
      capacite,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("✅ Réponse du backend :", data);
      document.getElementById("message").textContent =
        "✅ Événement créé avec succès !";
      setTimeout(() => (window.location.href = "events.html"), 2000);
    })
    .catch((error) => {
      console.error("❌ Erreur lors de la création de l'événement :", error);
      document.getElementById("message").textContent =
        "❌ Erreur lors de l'ajout.";
    });
}

async function getAuthToken() {
  try {
    const response = await fetch("http://127.0.0.1:8000/auth/me", {
      method: "GET",
      credentials: "include", // 🔥 Indispensable pour envoyer les cookies
    });

    if (!response.ok) {
      throw new Error("Utilisateur non connecté");
    }

    const data = await response.json();
    console.log("👤 Utilisateur connecté :", data);
    return true; // ✅ L'utilisateur est bien authentifié
  } catch (error) {
    console.error("❌ Erreur d'authentification :", error);
    return false;
  }
}
