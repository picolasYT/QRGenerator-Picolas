// 🔒 Verificar acceso Premium
if (localStorage.getItem("plan") !== "premium") {
  alert("Acceso restringido. Solo usuarios Premium.");
  window.location.href = "../index.html";
}

// Variables
const qrList = document.getElementById("qrList");
const emptyState = document.getElementById("emptyState");
const userName = document.getElementById("userName");
const logoutBtn = document.getElementById("logoutBtn");
const clearHistory = document.getElementById("clearHistory");

const userKey = localStorage.getItem("premiumUser") || "default_user";
userName.textContent = "Cuenta: " + userKey;

// Cargar historial del usuario
const allData = JSON.parse(localStorage.getItem("premiumHistory")) || {};
const userHistory = allData[userKey] || [];

function renderHistory() {
  qrList.innerHTML = "";
  if (userHistory.length === 0) {
    emptyState.style.display = "block";
    return;
  }

  emptyState.style.display = "none";
  userHistory.forEach((item, i) => {
    const card = document.createElement("div");
    card.className = "qr-card fade-in";
    card.style.animationDelay = `${i * 0.1}s`;

    card.innerHTML = `
      <img src="${item.image}" alt="QR generado">
      <div class="info">
        <p><strong>Enlace:</strong> <a href="${item.link}" target="_blank">${item.link}</a></p>
        <p><strong>Fecha:</strong> ${item.date}</p>
        <button class="btn primary download-btn">Descargar</button>
      </div>
    `;
    qrList.appendChild(card);

    // Descargar QR
    card.querySelector(".download-btn").addEventListener("click", () => {
      const link = document.createElement("a");
      link.download = "PicolasQR.png";
      link.href = item.image;
      link.click();
    });
  });
}

renderHistory();

// 🗑 Limpiar historial
clearHistory.addEventListener("click", () => {
  if (confirm("¿Seguro que querés eliminar todo el historial?")) {
    const all = JSON.parse(localStorage.getItem("premiumHistory")) || {};
    all[userKey] = [];
    localStorage.setItem("premiumHistory", JSON.stringify(all));
    qrList.innerHTML = "";
    emptyState.style.display = "block";
  }
});

// 🔓 Cerrar sesión
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("plan");
  localStorage.removeItem("premiumUser");
  window.location.href = "../index.html";
});
