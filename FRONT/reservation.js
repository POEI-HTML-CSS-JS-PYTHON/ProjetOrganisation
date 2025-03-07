document.addEventListener('DOMContentLoaded', function() {
    fetchReservations();

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
                fetchReservations(); // Rafraîchir la liste des réservations
            }
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
    });
});

function fetchReservations() {
    fetch('http://127.0.0.1:8000/reservations/')
        .then(response => response.json())
        .then(data => {
            const tbody = document.querySelector('#reservationsTable tbody');
            tbody.innerHTML = ''; // Vider le tableau avant de le remplir à nouveau

            data.forEach(reservation => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${reservation.id}</td>
                    <td>${reservation.utilisateur_id}</td>
                    <td>${reservation.personnel_id}</td>
                    <td>${reservation.date_de_reservation}</td>
                    <td>${reservation.status}</td>
                `;
                tbody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
}