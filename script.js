const urlInput = document.getElementById("url-input");
const generateBtn = document.getElementById("generate-btn");
const canvas = document.getElementById("qr-canvas");
const placeholder = document.getElementById("qr-placeholder");
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
  if (!url) {
    alert("Por favor ingresa una URL válida.");
    return;
  }

  qr.value = url;
  canvas.style.display = "block";
  placeholder.style.display = "none";

  const dataURL = canvas.toDataURL("image/png");
  downloadBtn.href = dataURL;
  downloadBtn.style.display = "inline-block";
});
