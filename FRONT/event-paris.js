document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("search-form");
    const input = document.getElementById("lieux");
    const resultsList = document.getElementById("events-list");
    const searchButton = document.getElementById("search-button");

    // Écouter le clic sur le bouton
    searchButton.addEventListener("click", async () => {
        const lieu = input.value.trim();
        if (lieu) {
            await searchEvents(lieu);
        } else {
            resultsList.innerHTML = `<li style="color: red;">Veuillez entrer un lieu.</li>`;
        }
    });

    // Fonction pour formater la date
    function formatDate(dateString) {
        const date = new Date(dateString);

        // Extraire la date
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Les mois commencent à 0
        const day = String(date.getDate()).padStart(2, '0');

        // Extraire l'heure
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return {
            date: `${day}/${month}/${year}`, // Format : JJ/MM/AAAA
            time: `${hours}:${minutes}`      // Format : HH:MM
        };
    }

    // Fonction pour rechercher les événements
    const searchEvents = async (lieu) => {
        try {
            // Envoyer une requête GET à l'API
            const response = await fetch(`http://127.0.0.1:8000/evenements/filter/${lieu}`);
            if (!response.ok) {
                throw new Error("Aucun événement trouvé pour ce lieu.");
            }
            const events = await response.json();

            console.log(events[0].title);

            // Effacer les résultats précédents
            resultsList.innerHTML = "";

            // Afficher les résultats
            events.forEach(event => {
                const eventCard = document.createElement("div");
                eventCard.classList.add("event-card");

                // Vérifier si l'événement a une image non nulle et non vide
                if (event.image && event.image.trim() !== "") {
                    eventCard.style.background = `url(${event.image})`;
                    eventCard.style.backgroundSize = "cover";
                    eventCard.style.backgroundPosition = "center";
                }

                // Formater la date et l'heure
                const formattedDateDebut = formatDate(event.date_debut);
                const formattedDateFin = formatDate(event.date_fin);

                eventCard.innerHTML = `
                    <div class="event-content">
                        <h3 class="eve-tit">${event.title}</h3>
                        <p class="eve-des"><strong>Description:</strong> ${event.description}</p>
                        <p class="eve-lieu"><strong>Lieu:</strong> ${event.lieu}</p>
                        <p class="eve-ddd"><strong>Date de début:</strong> ${formattedDateDebut.date} à ${formattedDateDebut.time}</p>
                        <p class="eve-ddf"><strong>Date de fin:</strong> ${formattedDateFin.date} à ${formattedDateFin.time}</p>
                        <p class="eve-cap"><strong>Capacité:</strong> ${event.capacite}</p>
                    </div>
                `;

                resultsList.appendChild(eventCard);
            });
        } catch (error) {
            resultsList.innerHTML = `<li style="color: red;">${error.message}</li>`;
        }
    };
});
