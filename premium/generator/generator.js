// Protección básica
const plan = localStorage.getItem("plan");
if (plan !== "premium") {
  alert("Acceso restringido. Esta sección es exclusiva para usuarios Premium.");
  window.location.href = "../../pricing/index.html";
}

// Elementos
const qrUrl = document.getElementById("qrUrl");
const frameText = document.getElementById("frameText");
const qrColor = document.getElementById("qrColor");
const bgColor = document.getElementById("bgColor");
const template = document.getElementById("template");
const generateBtn = document.getElementById("generateBtn");
const qrCanvas = document.getElementById("qrCanvas");
const downloadButtons = document.querySelectorAll("[data-format]");
const historyList = document.getElementById("historyList");

let qr;

// Generar QR usando QRious
generateBtn.addEventListener("click", () => {
  const value = qrUrl.value.trim() || "https://picolasqr.app";
  const text = frameText.value.trim() || "SCAN ME";
  const color = qrColor.value;
  const background = bgColor.value;

  // Crear el QR
  qr = new QRious({
    element: qrCanvas,
    value,
    size: 220,
    background,
    foreground: color,
    level: "H",
  });

  saveToHistory(value);
});

// Guardar historial
function saveToHistory(link) {
  const history = JSON.parse(localStorage.getItem("premiumHistory")) || [];
  const newQR = { link, date: new Date().toLocaleString() };
  history.unshift(newQR);
  localStorage.setItem("premiumHistory", JSON.stringify(history));
  renderHistory();
}

// Renderizar historial
function renderHistory() {
  const history = JSON.parse(localStorage.getItem("premiumHistory")) || [];
  historyList.innerHTML = "";
  history.forEach((item) => {
    const div = document.createElement("div");
    div.className = "history-item";
    div.innerHTML = `
      <img src="${qrCanvas.toDataURL("image/png")}" alt="QR">
      <p>${item.date}</p>
      <a href="${item.link}" target="_blank">${item.link}</a>
    `;
    historyList.appendChild(div);
  });
}

// Descarga
downloadButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (!qr) return alert("Primero genere un código QR.");

    const format = btn.dataset.format;
    const link = document.createElement("a");
    link.download = `picolasQR.${format}`;
    link.href = qrCanvas.toDataURL(`image/${format}`);
    link.click();
  });
});

// Render inicial
renderHistory();
