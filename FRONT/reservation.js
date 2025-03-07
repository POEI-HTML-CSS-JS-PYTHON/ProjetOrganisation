function createReservation(eventId) {
    const reservationData = {
        evenement_id: eventId,
        date_de_reservation: new Date().toISOString(), // Date actuelle au format ISO 8601
    };

    fetch("http://127.0.0.1:8000/reservations/", {
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
