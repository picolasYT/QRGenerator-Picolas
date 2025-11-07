// 🔒 Bloqueo Premium
if (localStorage.getItem("plan") !== "premium") {
  alert("Acceso restringido. Solo usuarios Premium.");
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
const downloadBtns = document.querySelectorAll("[data-format]");

// Inicializar QR
const qr = new QRious({
  element: qrCanvas,
  size: 250,
  value: "https://qr-generator-picolas.vercel.app/",
  foreground: "#00c853",
  background: "#ffffff",
  level: "H",
});

// 🎨 Efecto visual inicial
qrCanvas.style.transition = "transform 0.25s ease";

// Función para generar QR
generateBtn.addEventListener("click", () => {
  const text = qrInput.value.trim() || "https://qr-generator-picolas.vercel.app/";
  const color = colorInput.value;
  const bg = bgInput.value;
  const label = frameText.value.trim() || "SCAN ME";

  qr.set({
    value: text,
    foreground: color,
    background: bg,
  });

  // Actualizar texto del marco
  qrLabel.textContent = label.toUpperCase();
  qrLabel.style.background = color;

  // Guardar en historial del usuario premium
  const imgData = qrCanvas.toDataURL("image/png");
  saveToHistory(text, imgData);

  // Animación
  qrCanvas.style.transform = "scale(1.05)";
  setTimeout(() => (qrCanvas.style.transform = "scale(1)"), 300);
});

// Guardar historial (por usuario premium)
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

// 📥 Descargar QR con borde moderno + texto “SCAN ME” incluido
downloadBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const format = btn.getAttribute("data-format");
    const label = frameText.value.trim() || "SCAN ME";

    // Crear canvas temporal
    const tempCanvas = document.createElement("canvas");
    const ctx = tempCanvas.getContext("2d");
    const size = qrCanvas.width + 80;

    tempCanvas.width = size;
    tempCanvas.height = size + 60;

    // Fondo
    ctx.fillStyle = bgInput.value || "#fff";
    ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

    // Bordes suaves
    ctx.fillStyle = "#f0f0f0";
    ctx.strokeStyle = "#00c853";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.roundRect(20, 20, size - 40, size - 40, 20);
    ctx.stroke();

    // QR en el centro
    ctx.drawImage(qrCanvas, 40, 40, size - 80, size - 80);

    // Texto “SCAN ME”
    ctx.fillStyle = colorInput.value || "#00c853";
    ctx.font = "bold 24px Poppins";
    ctx.textAlign = "center";
    ctx.fillText(label.toUpperCase(), size / 2, size + 35);

    // Descargar
    const link = document.createElement("a");
    link.download = `PicolasQR.${format}`;
    link.href = tempCanvas.toDataURL(`image/${format}`);
    link.click();
  });
});
