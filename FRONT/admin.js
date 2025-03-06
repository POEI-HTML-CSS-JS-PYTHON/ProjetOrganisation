document
  .getElementById("adminForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch("http://127.0.0.1:8000/auth/create-admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        role: "admin",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Réponse API:", data);
        document.getElementById("result").innerText = JSON.stringify(data);
      })
      .catch((error) => console.error("Erreur :", error));
  });
