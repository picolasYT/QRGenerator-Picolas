// Protección básica: solo entra si es premium
const plan = localStorage.getItem("plan");
if (plan !== "premium") {
  alert("🔒 Acceso restringido. Esta página es solo para usuarios Premium.");
  window.location.href = "../pricing/index.html";
} else {
  console.log("✅ Bienvenido, usuario Premium.");
}
