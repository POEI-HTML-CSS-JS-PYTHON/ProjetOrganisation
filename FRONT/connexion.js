// Dans votre script de connexion (login.js)
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    fetch('http://127.0.0.1:8000/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            // Stocker le token dans localStorage
            localStorage.setItem('authToken', data.token);
            // Stocker les informations de l'utilisateur si nécessaire
            localStorage.setItem('userEmail', email);
            
            // Rediriger vers la page de réservation
            window.location.href = 'http://127.0.0.1:3000/html/reservation.html';
        } else {
            document.getElementById('message').textContent = 'Échec de connexion: ' + (data.detail || 'Erreur inconnue');
        }
    })
    .catch(error => {
        console.error('Erreur:', error);
    });
});