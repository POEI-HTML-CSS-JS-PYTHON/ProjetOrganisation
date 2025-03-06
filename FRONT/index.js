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
  fetch("http://127.0.0.1:8000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: "user@email.com",
      password: "123456",
    }),
    credentials: "include", // 🔥 Indique qu'on envoie et reçoit les cookies
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
