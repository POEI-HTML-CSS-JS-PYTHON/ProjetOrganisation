document.addEventListener("DOMContentLoaded", () => {
  loadEvents();
});

function loadEvents() {
  fetch("http://127.0.0.1:8000/events/")
    .then((response) => response.json())
    .then((events) => {
      const container = document.getElementById("events-container");
      container.innerHTML = "";

      events.forEach((event) => {
        const eventElement = document.createElement("div");
        eventElement.classList.add("event");
        eventElement.innerHTML = `
                    <h3>${event.title}</h3>
                    <p><strong>📍 Lieu :</strong> ${event.lieu}</p>
                    <p><strong>📅 Date :</strong> ${
                      event.date_debut.split("T")[0]
                    }</p>
                `;

        eventElement.addEventListener("click", () => {
          window.location.href = `event-detail.html?id=${event.id}`;
        });

        container.appendChild(eventElement);
      });
    })
    .catch((error) =>
      console.error("Erreur lors du chargement des événements :", error)
    );
}
