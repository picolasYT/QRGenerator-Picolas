// 🎨 PicolasQR Free Generator con marca de agua
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("qrInput");
  const generateBtn = document.getElementById("generateBtn");
  const canvas = document.getElementById("qrCanvas");
  const qrLabel = document.getElementById("qrLabel");
  const downloadButtons = document.querySelectorAll(".download-buttons .btn");

  // Generar QR
  generateBtn.addEventListener("click", () => {
    const url = input.value.trim();
    if (!url) {
      alert("Por favor, ingresá una URL o texto para generar el código QR.");
      return;
    }

    const qr = new QRious({
      element: canvas,
      value: url,
      size: 250,
      background: "#ffffff",
      foreground: "#000000",
    });

    // 🧩 Marca de agua
    const ctx = canvas.getContext("2d");
    const watermark = new Image();
    watermark.src = "/assets/logo-removebg-preview.png"; // tu logo transparente

    watermark.onload = () => {
      const wmWidth = qr.size * 0.5; // 50% del ancho del QR
      const wmHeight = (wmWidth * watermark.height) / watermark.width; // mantener proporción
      const x = (qr.size - wmWidth) / 2; // centrado horizontal
      const y = qr.size - wmHeight - 10; // abajo con margen
      ctx.globalAlpha = 0.25; // transparencia suave
      ctx.drawImage(watermark, x, y, wmWidth, wmHeight);
      ctx.globalAlpha = 1.0;
    };
  });

  // 📥 Descargar QR en varios formatos
  downloadButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const format = btn.dataset.format;
      const link = document.createElement("a");
      link.download = `picolasqr.${format}`;

      if (format === "svg") {
        // Exportar como SVG
        const svg = `
          <svg xmlns="http://www.w3.org/2000/svg" width="${canvas.width}" height="${canvas.height}">
            <image href="${canvas.toDataURL()}" width="100%" height="100%"/>
          </svg>`;
        const blob = new Blob([svg], { type: "image/svg+xml" });
        link.href = URL.createObjectURL(blob);
      } else {
        // PNG o JPG
        link.href = canvas.toDataURL(`image/${format}`);
      }

      link.click();
    });
  });
});
