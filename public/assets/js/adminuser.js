$(document).ready(function() {

//función acción login
$('#loginButton').on('click', function(event) {
event.preventDefault(); // Prevenir la acción predeterminada del formulario

// Obtener los valores de los campos del formulario
var username = $('#username').val();
var password = $('#password').val();

// Realizar el envío del formulario utilizando jQuery
$('#loginForm').submit();
});

//Función Logout
$('#logAut').on('click', function() {
iziToast.question({
  timeout: false,
  close: false,
  overlay: true,
  displayMode: 'once',
  id: 'confirm',
  zindex: 999999999,
  title: '¿Deseas cerrar sesión?',
  message: 'Si continúas, se cerrará tu sesión actual.',
  position: 'center',
  buttons: [
    ['<button><b>Sí</b></button>', function(instance, toast) {
      window.location.href = '/'; // Ruta a remplazar
      instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
    }, true],
    ['<button>No</button>', function(instance, toast) {
      instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
    }]
  ],
});
});

//Llamado alert botón setting

$('#setting').on('click', function() {
    iziToast.show({
        id: 'settingToast',
        theme: 'dark',
        icon: 'fa fa-cog',
        title: 'Configuración',
        message: 'Selecciona una opción:',
        position: 'center',
        progressBarColor: '#022a39',
        buttons: [
        ['<button><i class="fa fa-user"></i> Perfil</button>', function(instance, toast) {
            // Acción para el botón "Perfil"
            // Agrega tu código aquí
            instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
        }],
        ['<button><i class="fa fa-lock"></i> Contraseña</button>', function(instance, toast) {
            // Acción para el botón "Contraseña"
            // Agrega tu código aquí
            instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
        }],
        ['<button><i class="fa fa-sign-out-alt"></i> Cerrar sesión</button>', function(instance, toast) {
            // Acción para el botón "Cerrar sesión"
            // Agrega tu código aquí
            instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
        }]
        ]
    });
    });

//Mostrar mensaje de alerta.
$(document).ready(function() {
$('#showAlert').on('click', function() {
  iziToast.error({
    title: 'Error',
    message: 'Esta es la primera notificación',
    position: 'topCenter',
    timeout: 9000,
    titleColor: '#E15F32',
    messageColor: '#022A39'
  });

  iziToast.warning({
    title: 'Alerta',
    message: 'Esta es la segunda notificación',
    position: 'topCenter',
    timeout: 9000,
    titleColor: '#E15F32',
    messageColor: '#022A39'
  });

  iziToast.success({
    title: 'Notificación 3',
    message: 'Esta es la tercera notificación',
    position: 'topCenter',
    timeout: 9000,
    titleColor: '#E15F32',
    messageColor: '#022A39'
  });

  iziToast.info({
    title: 'Notificación 4',
    message: 'Esta es la cuarta notificación',
    position: 'topCenter',
    timeout: 9000,
    titleColor: '#E15F32',
    messageColor: '#022A39'
  });
  iziToast.show({
    title: 'Notificación 5',
    message: 'Esta es la cuarta notificación',
    position: 'topCenter',
    timeout: 9000,
    titleColor: '#E15F32',
    messageColor: '#022A39'
  });
});
});


 //Llamar lightbox editar 
$(document).on('click', '.editarBtn', function() {
    var id = $(this).closest('tr').find('.id').text();
    var name = $(this).closest('tr').find('.name').text();
    var ocupation = $(this).closest('tr').find('.ocupation').text();
    var template = 'adminuser/edituser.njk';
  // Realizar una llamada AJAX para obtener los datos del usuario
  $.ajax({
    url: '/edituser',
    method: 'POST',
    data: { id: id,name:name,ocupation:ocupation,template:template },
    success: function(response) {
         // Agregar la plantilla renderizada al contenido del lightbox
         $('#lightboxContent').html(response);

         // Mostrar el lightbox
         $('#editLightbox').fadeIn();
    },
    error: function() {
      console.error('Error al obtener los datos del usuario');
    }
  });
});

//Llamar lightbox adduser 
$(document).on('click', '.adduser', function() {
var template = 'adminuser/adduser.njk';
// Realizar una llamada AJAX para obtener los datos del usuario
    $.ajax({
    url: '/adduser',
    method: 'POST',
    data: {template:template },
    success: function(response) {
            // Agregar la plantilla renderizada al contenido del lightbox
            $('#lightboxContent').html(response);

            // Mostrar el lightbox
            $('#editLightbox').fadeIn();
    },
      error: function() {
          console.error('Error al obtener los datos del usuario');
      }
    });
});

//Llamar eliminar registro
$(document).on('click', '.settinguser', function(){
    var id = $(this).closest('tr').find('.id').text();
    var name = $(this).closest('tr').find('.name').text();
    var ocupation = $(this).closest('tr').find('.ocupation').text();
    var template = 'adminuser/edituser.njk';
    iziToast.show({
        id: 'settingToast',
        theme: 'dark',
        icon: 'fa fa-cog',
        title: 'Configuración',
        message: 'Selecciona una opción para :'+ name,
        position: 'center',
        progressBarColor: '#022a39',
        buttons: [
        ['<button><i class="fa-solid fa-pen-to-square"></i> Editar </button>', function(instance, toast) {
            // Acción para el botón "Editar"
            $.ajax({
                url: '/edituser',
                method: 'POST',
                data: { id: id,name:name,ocupation:ocupation,template:template },
                success: function(response) {
                     // Agregar la plantilla renderizada al contenido del lightbox
                     $('#lightboxContent').html(response);
        
                     // Mostrar el lightbox
                     $('#editLightbox').fadeIn();
                },
                error: function() {
                  console.error('Error al obtener los datos del usuario');
                }
              });
            instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
        }],
        ['<button><i class="fa-solid fa-trash"></i> Borrar </button>', function(instance, toast) {
            // Acción para el botón "Borrar"
            iziToast.question({
                timeout: false,
                close: false,
                overlay: true,
                displayMode: 'once',
                id: 'confirm',
                zindex: 999999999,
                title: '¿Deseas eliminar el usuario?',
                message: 'Si continúas, esta opción no puede revertirse.',
                position: 'center',
                buttons: [
                  ['<button><b>Sí</b></button>', function(instance, toast) {
                    //Código acción eliminar usuario

                    instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
                  }, true],
                  ['<button>No</button>', function(instance, toast) {
                    instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
                  }]
                ],
              });
            instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
        }]
        ]
    });
    });

//Cerrar Lightbox
 $(document).on('click', '.cancelarBtn', function() {
    var lightbox = $(this).closest('.lightbox'); // Encontrar el contenedor del lightbox
    lightbox.fadeOut(); // Ocultar el lightbox
  });

  //guardar info lightBox
  $(document).on('click', '.guardarBtn', function() {
      var idInterno = $('#id').val();
      var nombre = $('#name').val();
      var cargo = $('#ocupation').val();
      
      // Realizar las acciones necesarias con los datos actualizados

      $('#editLightbox').fadeOut();
  });


});


