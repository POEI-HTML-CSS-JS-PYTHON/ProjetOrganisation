document.getElementById('reservationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const date_about = document.getElementById('date_about').value;
    const date_full = document.getElementById('date_full').value;
    const list = document.getElementById('list').value;
    const capacite = document.getElementById('capacite').value;

    fetch('http://127.0.0.1:8000/evenenents/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, date_about, date_full, list, capacite }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.detail) {
            document.getElementById('message').textContent = data.detail;
        } else {
            document.getElementById('message').textContent = 'Réservation créée avec succès!';
        }
    })
    .catch(error => {
        console.error('Erreur:', error);
    });
});