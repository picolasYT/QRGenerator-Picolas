const urlInput = document.getElementById("url-input");
const textInput = document.getElementById("frame-text");
const positionSelect = document.getElementById("position");
const generateBtn = document.getElementById("generate-btn");
const canvas = document.getElementById("qr-canvas");
const downloadBtn = document.getElementById("download-btn");

const qr = new QRious({
  element: canvas,
  size: 250,
  background: "white",
  foreground: "#00c853",
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

  // Dibujar marco y texto al renderizar
  setTimeout(() => {
    const ctx = canvas.getContext("2d");
    const size = canvas.width;
    const padding = 15;
    const borderRadius = 20;

    // Crear fondo con bordes redondeados
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = size + padding * 2;
    tempCanvas.height = size + 80;
    const tempCtx = tempCanvas.getContext("2d");

    // Fondo oscuro
    tempCtx.fillStyle = "#1E2230";
    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

    // Fondo blanco del QR con esquinas redondeadas
    tempCtx.fillStyle = "white";
    roundRect(tempCtx, padding, padding, size, size, borderRadius);
    tempCtx.fill();

    // Dibujar QR encima
    tempCtx.drawImage(canvas, padding, padding, size, size);

    // Texto del marco
    tempCtx.fillStyle = "#00c853";
    tempCtx.font = "bold 24px 'Poppins', sans-serif";
    tempCtx.textAlign = "center";
    tempCtx.fillText(frameText, tempCanvas.width / 2, size + 55);

    // Reemplazar el canvas visible por el render final
    const finalImg = new Image();
    finalImg.src = tempCanvas.toDataURL("image/png");

    finalImg.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.width = tempCanvas.width;
      canvas.height = tempCanvas.height;
      ctx.drawImage(finalImg, 0, 0);
    };

    // Descargar versión con marco
    const dataURL = tempCanvas.toDataURL("image/png");
    downloadBtn.href = dataURL;
    downloadBtn.style.display = "inline-block";
  }, 200);
});

// Función para dibujar rectángulo redondeado
function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}
