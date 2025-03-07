document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("loginForm").addEventListener("submit", function (event) {
        event.preventDefault();
        loginUser();
    });
});

function loginUser() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    fetch("http://127.0.0.1:8000/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include", // Envoi et réception des cookies
        body: JSON.stringify({ email, password }),
    })
    .then(response => response.json())
    .then(data => {
        console.log("Réponse Connexion:", data);
        document.getElementById("result").innerText = data.message || JSON.stringify(data);
    })
    .catch(error => console.error("Erreur :", error));
}
