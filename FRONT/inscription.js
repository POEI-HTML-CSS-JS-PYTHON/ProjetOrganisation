document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    

    fetch('http://127.0.0.1:8000/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email:email, password:password}),
    })
    .then(response => response.json())
    .then(data => {
        if (data.detail) {
            document.getElementById('message').textContent = data.detail;
        } else {
            document.getElementById('message').textContent = 'Inscription réussie! Vous allez être redirigé vers la page d\'accueil.';
            setTimeout(() => {
                window.location.href = 'http://127.0.0.1:3000/html/accueil.html';
            }, 2000);
        }
        }
    )
    .catch(error => {
        console.error('Erreur:', error);
    });
});
