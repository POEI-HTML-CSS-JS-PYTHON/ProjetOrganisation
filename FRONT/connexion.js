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
        if (data.detail) {
            document.getElementById('message').textContent = data.detail;
        } else {
            document.getElementById('message').textContent = 'Connexion réussie! Vous allez être redirigé';
            setTimeout(() => {
                window.location.href = 'http://127.0.0.1:3000/html/accueil.html';
            }, 2000);
        }
    })
    .catch(error => {
        document.getElementById('message').textContent = error.message;
    });
});