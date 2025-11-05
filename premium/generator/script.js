// Bloqueo para usuarios no premium
if (localStorage.getItem("plan") !== "premium") {
  alert("Acceso restringido. Solo usuarios Premium pueden usar el generador avanzado.");
  window.location.href = "../../pricing/index.html";
}

// Elementos principales
const qrInput = document.getElementById("qrInput");
const colorInput = document.getElementById("colorInput");
const bgInput = document.getElementById("bgInput");
const frameText = document.getElementById("frameText");
const qrCanvas = document.getElementById("qrCanvas");
const generateBtn = document.getElementById("generateBtn");
const qrLabel = document.getElementById("qrLabel");

// Inicializa QRious
const qr = new QRious({
  element: qrCanvas,
  size: 250,
  value: "https://picolasqr.app",
  foreground: "#00c853",
  background: "#ffffff",
  level: "H",
});

// Generar QR personalizado
generateBtn.addEventListener("click", () => {
  const text = qrInput.value.trim() || "https://picolasqr.app";
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

  saveHistory(text);
});

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

// Guardar historial
function saveHistory(url) {
  const history = JSON.parse(localStorage.getItem("premiumHistory")) || [];
  history.unshift({ url, date: new Date().toLocaleString() });
  localStorage.setItem("premiumHistory", JSON.stringify(history));
}
