function createReservation(eventId) {
    const reservationData = {
        evenement_id: eventId,
        date_de_reservation: new Date().toISOString(), // Date actuelle au format ISO 8601
    };

    fetch("http://localhost:8000/reservations/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            
        },
        credentials: "include", // Pour envoyer les cookies si nécessaire
        body: JSON.stringify(reservationData),
    })
    .then(response => response.json())
    .then(data => {
        console.log("Réservation créée :", data);
        document.getElementById("result").innerText = "Réservation confirmée !";
    })
    .catch(error => {
        console.error("Erreur lors de la réservation :", error);
        document.getElementById("result").innerText = "Erreur lors de la réservation.";
    });
}

// Exemple : Appeler la fonction avec un ID d'événement spécifique
document.getElementById("reserveButton").addEventListener("click", () => {
    const eventId = document.getElementById("eventIdInput").value;
    if (eventId) {
        createReservation(parseInt(eventId));
    } else {
        alert("Veuillez entrer un ID d'événement valide.");
    }
});
document.addEventListener("DOMContentLoaded", function () {
    fetchReservations();
});

function fetchReservations() {
    const apiUrl = "http://127.0.0.1:8000/reservations/"; // 

    fetch(apiUrl)
        .then(response => {
            console.log("Statut de la réponse :", response.status);
            if (!response.ok) {
                throw new Error(`Erreur API: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Données reçues :", data);
            const tableBody = document.getElementById("reservationsTable");
            tableBody.innerHTML = ""; // Nettoyer la table avant de remplir

            if (!Array.isArray(data) || data.length === 0) {
                tableBody.innerHTML = "<tr><td colspan='5'>Aucune réservation trouvée.</td></tr>";
                return;
            }

            data.forEach(reservation => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${reservation.id}</td>
                    <td>${reservation.utilisateur_id}</td>
                    <td>${reservation.evenement_id}</td>
                    <td>${new Date(reservation.date_de_reservation).toLocaleString()}</td>
                    <td>${reservation.status}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error("Erreur lors du chargement des réservations :", error);
            document.getElementById("reservationsTable").innerHTML = `<tr><td colspan='5'>Erreur: ${error.message}</td></tr>`;
        });
}
