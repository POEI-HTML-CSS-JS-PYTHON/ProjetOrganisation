document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    fetch("http://127.0.0.1:8000/auth/register", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, role }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.detail) {
            document.getElementById('message').textContent = data.detail;
        } else {
            document.getElementById('message').textContent = 'Inscription réussie!';
            // Rediriger l'utilisateur ou effectuer d'autres actions
        }
    })
    .catch(error => {
        console.error('Erreur:', error);
    });
});
  
