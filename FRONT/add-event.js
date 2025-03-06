document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("eventForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      createEvent();
    });
});

// ✅ Créer un nouvel événement
function createEvent() {
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
      document.getElementById("message").textContent =
        "✅ Événement créé avec succès !";
      setTimeout(() => (window.location.href = "events.html"), 2000);
    })
    .catch((error) => {
      console.error("Erreur lors de la création de l'événement :", error);
      document.getElementById("message").textContent =
        "❌ Erreur lors de l'ajout.";
    });
}
