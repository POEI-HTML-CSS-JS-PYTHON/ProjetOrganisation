document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("loginForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      loginUser();
    });
});

function testAPI() {
  fetch("http://127.0.0.1:8000/")
    .then((response) => response.json())
    .then((data) => {
      console.log("Réponse du backend :", data);
      document.getElementById("result").innerText = JSON.stringify(data);
    })
    .catch((error) => console.error("Erreur :", error));
}

function registerUser() {
  fetch("http://127.0.0.1:8000/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: "user@email.com",
      password: "123456",
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Réponse Inscription:", data);
      document.getElementById("result").innerText = JSON.stringify(data);
    })
    .catch((error) => console.error("Erreur :", error));
}

function loginUser() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  fetch("http://127.0.0.1:8000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // 🔥 Indique qu'on envoie et reçoit les cookies
    body: JSON.stringify({ email, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Réponse Connexion:", data);
      document.getElementById("result").innerText = JSON.stringify(data);
    })
    .catch((error) => console.error("Erreur :", error));
}

function getUserInfo() {
  fetch("http://127.0.0.1:8000/auth/me", {
    method: "GET",
    credentials: "include", // 🔥 Important pour envoyer le cookie JWT !
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Utilisateur connecté :", data);
      document.getElementById("result").innerText = JSON.stringify(data);
    })
    .catch((error) => console.error("Erreur :", error));
}

function disconnectUser() {
  console.log("🔍 Tentative de déconnexion...");

  fetch("http://127.0.0.1:8000/auth/logout", {
    method: "POST",
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("✅ Utilisateur déconnecté :", data);
      document.getElementById("result").innerText = JSON.stringify(data);

      // 🔥 Suppression forcée du cookie côté navigateur
      document.cookie =
        "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=None; Secure";

      // 🗑️ Suppression du token du localStorage
      localStorage.removeItem("token");

      // 🚀 Rafraîchir la page pour voir si l'utilisateur est toujours connecté
      setTimeout(() => {
        window.location.reload();
      }, 500);
    })
    .catch((error) => console.error("❌ Erreur :", error));
}
