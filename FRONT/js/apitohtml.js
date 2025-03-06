function loginUser() {
    // Simuler une réponse de connexion réussie
    const mockResponse = {
      access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...", // Token fictif
      email: "test@example.com", // E-mail de test
    };
  
    console.log("Réponse Connexion (simulée):", mockResponse);
  
    // Stocker le token dans localStorage
    if (mockResponse.access_token) {
      localStorage.setItem('token', mockResponse.access_token);
      console.log('Token stocké avec succès.');
  
      // Simuler l'affichage de l'e-mail
      const emailElement = document.getElementById('bonjour-n');
      if (emailElement) {
        emailElement.textContent = mockResponse.email;
      }
    } else {
      console.error('Aucun token reçu.');
    }
  }

  async function fetchUserEmail() {
    try {
      // Récupérer le token depuis localStorage
      const token = localStorage.getItem('token');
  
      if (!token) {
        console.error('Aucun token trouvé. Veuillez vous connecter.');
        return;
      }
  
      // Faire une requête GET à l'API pour récupérer l'e-mail
      const response = await fetch("http://127.0.0.1:8000/api/user/email", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`, // Envoyer le token dans les en-têtes
        },
      });
  
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données');
      }
  
      // Convertir la réponse en JSON
      const data = await response.json();
  
      // Afficher l'e-mail dans l'élément #bonjour-n
      const emailElement = document.getElementById('bonjour-n');
      if (emailElement) {
        emailElement.textContent = data.email;
      }
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'e-mail :', error.message);
    }
  }

  