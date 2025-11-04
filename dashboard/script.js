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

  // Mostrar botón de descarga
  const dataURL = canvas.toDataURL("image/png");
  downloadBtn.href = dataURL;
  downloadBtn.style.display = "inline-block";
});
