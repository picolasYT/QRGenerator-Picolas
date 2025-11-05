// Protección básica de acceso
if (localStorage.getItem("plan") !== "premium") {
  alert("Acceso restringido. Solo usuarios Premium pueden acceder a esta sección.");
  window.location.href = "../pricing/index.html";
}
