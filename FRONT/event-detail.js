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

  console.log(`🔍 Chargement des détails pour l'événement ID : ${eventId}`);

  fetch(`http://127.0.0.1:8000/evenements/${eventId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Événement non trouvé !");
      }
      return response.json();
    })
    .then((event) => {
      console.log("📌 Détails de l'événement :", event);

      if (!event || Object.keys(event).length === 0) {
        document.getElementById("event-details").innerHTML =
          "<p>⚠ Aucun détail disponible pour cet événement.</p>";
        return;
      }

      const container = document.getElementById("event-details");
      container.innerHTML = `
                <h2>${event.title}</h2>
                <p><strong>🆔 ID :</strong> ${event.id}</p>
                <p><strong>Description :</strong> ${event.description}</p>
                <p><strong>📍 Lieu :</strong> ${event.lieu}</p>
                <p><strong>📅 Date :</strong> ${
                  event.date_debut.split("T")[0]
                } - ${event.date_fin.split("T")[0]}</p>
                <p><strong>👥 Capacité :</strong> ${event.capacite}</p>
                <p><strong>👤 Organisateur ID :</strong> ${
                  event.organizer_id
                }</p>
            `;
    })
    .catch((error) => {
      console.error("❌ Erreur lors du chargement de l'événement :", error);
      document.getElementById("event-details").innerHTML =
        "<p>⚠ Impossible de charger l'événement.</p>";
    });
}
