document.addEventListener("DOMContentLoaded", () => {
  loadEventDetails();
});

// ✅ Récupérer l'ID de l'événement depuis l'URL
function getEventIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

// ✅ Charger les détails de l'événement
function loadEventDetails() {
  const eventId = getEventIdFromURL();
  if (!eventId) {
    document.getElementById("event-details").innerHTML =
      "<p>⚠ Aucun événement trouvé.</p>";
    return;
  }

  fetch(`http://127.0.0.1:8000/events/${eventId}`)
    .then((response) => response.json())
    .then((event) => {
      const container = document.getElementById("event-details");
      container.innerHTML = `
                <h2>${event.title}</h2>
                <p><strong>Description :</strong> ${event.description}</p>
                <p><strong>📍 Lieu :</strong> ${event.lieu}</p>
                <p><strong>📅 Date :</strong> ${event.date_debut} - ${event.date_fin}</p>
                <p><strong>👥 Capacité :</strong> ${event.capacite}</p>
            `;
    })
    .catch((error) => {
      console.error("Erreur lors du chargement de l'événement :", error);
      document.getElementById("event-details").innerHTML =
        "<p>⚠ Impossible de charger l'événement.</p>";
    });
}
