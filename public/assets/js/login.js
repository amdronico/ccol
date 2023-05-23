    document.getElementById('loginButton').addEventListener('click', function(event) {
    event.preventDefault(); // Prevenir la acción predeterminada del formulario
  
    // Obtener los valores de los campos del formulario
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
  
    // Realizar el envío del formulario utilizando JavaScript
    document.getElementById('loginForm').submit();
  });