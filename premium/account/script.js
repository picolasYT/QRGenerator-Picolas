// Verificar acceso Premium
if (localStorage.getItem("plan") !== "premium") {
  alert("Acceso restringido. Solo usuarios Premium.");
  window.location.href = "../index.html";
}

// Variables
const qrList = document.getElementById("qrList");
const emptyState = document.getElementById("emptyState");
const userName = document.getElementById("userName");
const logoutBtn = document.getElementById("logoutBtn");

const userKey = localStorage.getItem("premiumUser") || "default_user";
userName.textContent = "Cuenta: " + userKey;

// Cargar historial del usuario
const allData = JSON.parse(localStorage.getItem("premiumHistory")) || {};
const userHistory = allData[userKey] || [];

if (userHistory.length === 0) {
  emptyState.style.display = "block";
} else {
  userHistory.forEach((item) => {
    const card = document.createElement("div");
    card.className = "qr-card";
    card.innerHTML = `
      <img src="${item.image}" alt="QR">
      <div class="info">
        <p><strong>Enlace:</strong> <a href="${item.link}" target="_blank">${item.link}</a></p>
        <p><strong>Fecha:</strong> ${item.date}</p>
      </div>
    `;
    qrList.appendChild(card);
  });
}

// Cerrar sesión
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("plan");
  localStorage.removeItem("premiumUser");
  window.location.href = "../index.html";
});
