
//función de acción sidebar
(function($) {
	"use strict";
	var fullHeight = function() {
		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});
	};
	fullHeight();
	$('#sidebarCollapse').on('click', function () {
      $('#sidebar').toggleClass('active');
  });

})(jQuery);


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

	//llamado renderización cards
	$('.buttoncard').click(function() {
		var templatePath = $(this).data('template'); // Obtener la ruta de la plantilla desde el atributo 'data-template'
		var title = $(this).find('.text-container').data('title');
		var route = $(this).data('route');
	
		// Realizar una llamada AJAX a tu servidor Express para renderizar la plantilla
		$.ajax({
		  url: route,
		  method: 'POST',
		  data: { template: templatePath },
		  success: function(response) {
			$('#templateContainer').html(response);
			$('#title').html(title);
		  }
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



  
  
  

  
