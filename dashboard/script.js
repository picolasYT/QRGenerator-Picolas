const urlInput = document.getElementById("url-input");
const textInput = document.getElementById("frame-text");
const positionSelect = document.getElementById("position");
const generateBtn = document.getElementById("generate-btn");
const canvas = document.getElementById("qr-canvas");
const frameTop = document.getElementById("frame-top");
const frameBottom = document.getElementById("frame-bottom");
const downloadBtn = document.getElementById("download-btn");

const qr = new QRious({
  element: canvas,
  size: 220,
  background: "white",
  foreground: "black",
  value: ""
});

generateBtn.addEventListener("click", () => {
  const url = urlInput.value.trim();
  const frameText = textInput.value.trim() || "SCAN ME";
  const position = positionSelect.value;

  if (!url) {
    alert("Por favor ingresa una URL válida.");
    return;
  }

  // Generar QR
  qr.value = url;

  // Mostrar texto según la posición elegida
  frameTop.style.display = position === "top" ? "block" : "none";
  frameBottom.style.display = position === "bottom" ? "block" : "none";

  if (position === "top") frameTop.textContent = frameText;
  else frameBottom.textContent = frameText;

  // ✨ Dibujar marca de agua de texto
  setTimeout(() => {
    const ctx = canvas.getContext("2d");
    const marca = "PicolasQR";

    ctx.globalAlpha = 0.25; // transparencia suave
    ctx.font = "bold 16px Poppins, sans-serif";
    ctx.fillStyle = "#00c853";
    ctx.textAlign = "center";
    ctx.fillText(marca, qr.size / 2, qr.size - 10);
    ctx.globalAlpha = 1.0;

    // Actualizar enlace de descarga
    const dataURL = canvas.toDataURL("image/png");
    downloadBtn.href = dataURL;
    downloadBtn.style.display = "inline-block";
  }, 150);
});
