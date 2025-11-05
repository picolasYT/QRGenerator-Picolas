// Clave maestra
const MASTER_KEY = "PicolasAdmin2025";

// Elementos
const loginSection = document.getElementById("loginSection");
const adminPanel = document.getElementById("adminPanel");
const adminPass = document.getElementById("adminPass");
const loginBtn = document.getElementById("loginBtn");
const loginError = document.getElementById("loginError");
const newPass = document.getElementById("newPass");
const addPassBtn = document.getElementById("addPassBtn");
const passList = document.getElementById("passList");
const saveBtn = document.getElementById("saveBtn");
const statusMsg = document.getElementById("statusMsg");

let passwords = [];

// Login admin
loginBtn.addEventListener("click", () => {
  if (adminPass.value.trim() === MASTER_KEY) {
    loginSection.classList.add("hidden");
    adminPanel.classList.remove("hidden");
    loadPasswords();
  } else {
    loginError.textContent = "Clave maestra incorrecta.";
  }
});

// Cargar contraseñas actuales
async function loadPasswords() {
  try {
    const res = await fetch("/data/users.json");
    const data = await res.json();
    passwords = data.premiumPasswords;
    renderList();
  } catch (err) {
    console.error(err);
  }
}

// Renderizar lista
function renderList() {
  passList.innerHTML = "";
  passwords.forEach((p, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${p}</span>
      <button onclick="deletePass(${index})">Eliminar</button>
    `;
    passList.appendChild(li);
  });
}

// Agregar contraseña
addPassBtn.addEventListener("click", () => {
  const value = newPass.value.trim();
  if (!value) return;
  passwords.push(value);
  newPass.value = "";
  renderList();
});

// Eliminar contraseña
window.deletePass = (index) => {
  passwords.splice(index, 1);
  renderList();
};

// Guardar cambios (descarga JSON actualizado)
saveBtn.addEventListener("click", () => {
  const updated = { premiumPasswords: passwords };
  const blob = new Blob([JSON.stringify(updated, null, 2)], {
    type: "application/json",
  });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "users.json";
  link.click();

  statusMsg.textContent = "Archivo actualizado descargado correctamente.";
});
