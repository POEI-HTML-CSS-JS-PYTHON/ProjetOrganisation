document.addEventListener("DOMContentLoaded", () => {
  loadUserProfile();
});

// ✅ Charger les détails de l'utilisateur et ses réservations
function loadUserProfile() {
  fetch("http://localhost:8000/auth/me", {
    method: "GET",
    credentials: "include", // 🔥 Envoie le cookie JWT
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("📌 Infos utilisateur :", data);

      if (!data || !data.email) {
        document.getElementById("user-info").innerHTML =
          "<p>⚠ Utilisateur non trouvé.</p>";
        return;
      }

      // ✅ Affichage des infos de l'utilisateur
      const userInfo = document.getElementById("user-info");
      userInfo.innerHTML = `
            <p><strong>🆔 ID :</strong> ${data.id}</p>
            <p><strong>📧 Email :</strong> ${data.email}</p>
            <p><strong>🔰 Rôle :</strong> ${data.role}</p>
        `;

      // ✅ Affichage des réservations
      const reservationsContainer = document.getElementById(
        "reservations-container"
      );
      reservationsContainer.innerHTML = "";

      if (data.reservations.length === 0) {
        reservationsContainer.innerHTML =
          "<p>❌ Aucune réservation trouvée.</p>";
        return;
      }

      data.reservations.forEach((reservation) => {
        const reservationElement = document.createElement("div");
        reservationElement.classList.add("reservation");
        reservationElement.innerHTML = `
                <p><strong>🎟️ Réservation ID :</strong> ${reservation.id}</p>
                <p><strong>📅 Date :</strong> ${reservation.date_reservation}</p>
                <p><strong>📌 Statut :</strong> ${reservation.status}</p>
                <p><strong>📢 Événement ID :</strong> ${reservation.event_id}</p>
            `;
        reservationsContainer.appendChild(reservationElement);
      });
    })
    .catch((error) => {
      console.error("❌ Erreur lors du chargement de l'utilisateur :", error);
      document.getElementById("user-info").innerHTML =
        "<p>⚠ Impossible de charger les informations.</p>";
    });
}

// ✅ Déconnexion de l'utilisateur
function disconnectUser() {
  console.log("🔍 Tentative de déconnexion...");

  fetch("http://127.0.0.1:8000/auth/logout", {
    method: "POST",
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("✅ Utilisateur déconnecté :", data);
      document.getElementById("user-info").innerHTML =
        "<p>✅ Déconnecté avec succès.</p>";

      // 🔥 Supprimer le cookie côté client
      document.cookie =
        "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=localhost; samesite=None; secure=False;";

      // 🚀 Redirection après la déconnexion
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1000);
    })
    .catch((error) =>
      console.error("❌ Erreur lors de la déconnexion :", error)
    );
}
