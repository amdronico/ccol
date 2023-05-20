// Obtener el botón y el popup
var button = document.getElementById("ButtonQr");
var popup = document.getElementById("PopupQr");

// Abrir el popup al hacer clic en el botón
button.addEventListener("click", function() {
  popup.style.display = "block";
});

// Cerrar el popup al hacer clic en el botón de cerrar
var closeButton = document.querySelector(".close");
closeButton.addEventListener("click", function() {
  popup.style.display = "none";
});

// Cerrar el popup al hacer clic fuera de él
window.addEventListener("click", function(event) {
  if (event.target == popup) {
    popup.style.display = "none";
  }
});