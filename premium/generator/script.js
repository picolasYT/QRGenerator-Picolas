// Bloqueo Premium
if (localStorage.getItem("plan") !== "premium") {
  alert("Acceso restringido. Solo usuarios Premium.");
  window.location.href = "../../pricing/index.html";
}

const qrInput = document.getElementById("qrInput");
const colorInput = document.getElementById("colorInput");
const bgInput = document.getElementById("bgInput");
const frameText = document.getElementById("frameText");
const qrCanvas = document.getElementById("qrCanvas");
const generateBtn = document.getElementById("generateBtn");
const qrLabel = document.getElementById("qrLabel");

// Inicializar QR
const qr = new QRious({
  element: qrCanvas,
  size: 250,
  value: "https://qr-generator-picolas.vercel.app/",
  foreground: "#00c853",
  background: "#ffffff",
  level: "H",
});

// Generar QR
generateBtn.addEventListener("click", () => {
  const text = qrInput.value.trim() || "https://qr-generator-picolas.vercel.app/";
  const color = colorInput.value;
  const bg = bgInput.value;
  const label = frameText.value || "SCAN ME";

  qr.set({
    value: text,
    foreground: color,
    background: bg,
  });

  qrLabel.textContent = label;
  qrLabel.style.background = color;

  // Guardar QR en historial del usuario
  const imgData = qrCanvas.toDataURL("image/png");
  saveToHistory(text, imgData);

  // Animación visual
  qrCanvas.style.transform = "scale(1.05)";
  setTimeout(() => (qrCanvas.style.transform = "scale(1)"), 300);
});

// Guardar historial
function saveToHistory(link, image) {
  const user = localStorage.getItem("premiumUser") || "default";
  const allHistory = JSON.parse(localStorage.getItem("premiumHistory")) || {};
  if (!allHistory[user]) allHistory[user] = [];

  allHistory[user].unshift({
    link,
    image,
    date: new Date().toLocaleString(),
  });

  localStorage.setItem("premiumHistory", JSON.stringify(allHistory));
}

// Descargar QR
document.querySelectorAll("[data-format]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const format = btn.getAttribute("data-format");
    const link = document.createElement("a");
    link.download = `PicolasQR.${format}`;
    link.href = qrCanvas.toDataURL(`image/${format}`);
    link.click();
  });
});
