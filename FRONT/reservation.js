document.getElementById('createReservationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const covenant_id = document.getElementById('covenant_id').value;
    const date_dr_reservation = document.getElementById('date_dr_reservation').value;

    fetch('http://127.0.0.1:8000/reservations/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ covenant_id, date_dr_reservation }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.detail) {
            document.getElementById('message').textContent = data.detail;
        } else {
            document.getElementById('message').textContent = 'Réservation créée avec succès!';
            // Rediriger l'utilisateur ou effectuer d'autres actions
        }
    })
    .catch(error => {
        console.error('Erreur:', error);
    });
});