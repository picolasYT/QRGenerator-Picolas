// Si el usuario ya es Premium, no necesita volver a ingresar
if (localStorage.getItem("plan") === "premium") {
  console.log("Acceso Premium detectado");
}

// Modal Elements
const modal = document.getElementById("loginModal");
const openModal = document.getElementById("openModal");
const closeModal = document.getElementById("closeModal");
const verifyBtn = document.getElementById("verifyBtn");
const accessPass = document.getElementById("accessPass");
const errorMsg = document.getElementById("errorMsg");

// Abrir modal
openModal.addEventListener("click", (e) => {
  e.preventDefault();
  modal.style.display = "flex";
  accessPass.focus();
});

// Cerrar modal
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
  errorMsg.textContent = "";
  accessPass.value = "";
});

// Verificar contraseña
verifyBtn.addEventListener("click", async () => {
  const pass = accessPass.value.trim();
  if (!pass) return;

  try {
    const res = await fetch("/data/users.json");
    const data = await res.json();

    if (data.premiumPasswords.includes(pass)) {
      localStorage.setItem("plan", "premium");
      alert("Acceso concedido. Bienvenido a PicolasQR Premium.");
      window.location.href = "./generator/";
    } else {
      errorMsg.textContent = "Contraseña incorrecta o no registrada.";
      accessPass.value = "";
    }
  } catch (err) {
    errorMsg.textContent = "Error al verificar. Intente nuevamente.";
    console.error(err);
  }
});

// Cerrar modal al hacer clic fuera
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
