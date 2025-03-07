document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('http://127.0.0.1:8000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Identifiants incorrects');
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('message').textContent = 'Connexion réussie!';
        // Rediriger l'utilisateur vers une autre page ou effectuer d'autres actions
        window.location.href = '/reservation.html'; // Redirection vers la page de réservation
    })
    .catch(error => {
        document.getElementById('message').textContent = error.message;
    });
});