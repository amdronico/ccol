
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

//Mostrar mensaje de alerta.
$(document).ready(function() {
	$('#showAlert').on('click', function() {
	  iziToast.show({
		title: 'Notificación 1',
		message: 'Esta es la primera notificación',
		position: 'topCenter',
		timeout: 9000,
		titleColor: '#E15F32',
		messageColor: '#022A39'
	  });
  
	  iziToast.show({
		title: 'Notificación 2',
		message: 'Esta es la segunda notificación',
		position: 'topCenter',
		timeout: 9000,
		titleColor: '#E15F32',
		messageColor: '#022A39'
	  });
  
	  iziToast.show({
		title: 'Notificación 3',
		message: 'Esta es la tercera notificación',
		position: 'topCenter',
		timeout: 9000,
		titleColor: '#E15F32',
		messageColor: '#022A39'
	  });
  
	  iziToast.show({
		title: 'Notificación 4',
		message: 'Esta es la cuarta notificación',
		position: 'topCenter',
		timeout: 9000,
		titleColor: '#E15F32',
		messageColor: '#022A39'
	  });
	});
  });

//función acción login
$('#loginButton').on('click', function(event) {
	event.preventDefault(); // Prevenir la acción predeterminada del formulario
  
	// Obtener los valores de los campos del formulario
	var username = $('#username').val();
	var password = $('#password').val();
  
	// Realizar el envío del formulario utilizando jQuery
	$('#loginForm').submit();
  });
  
