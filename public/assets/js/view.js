

//Función de acción sidebar
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
  
//Llamado renderización cards
  $('body').on('click', '.buttoncard', function() {
    var templatePath = $(this).data('template'); // Obtener la ruta de la plantilla desde el atributo 'data-template'
    var title = $(this).find('.text-container').data('title');
    var route = $(this).data('route');
    //Si es admin usar se crea el icono add user
    if (route==='/adminuser'){
       var button = '<span class="icon"><i class="fa-solid fa-user-plus fa-2xl"></i></span>';
    }
    // Si es lista de proveedores se muestra el icono recibir
    if (route=='/listaproveedores'){
      var button = '<span class="icon"><i class="fa-solid fa-receipt fa-2xl" style="color: #022a3933;"></i></span>';
      //Quitar clase adduser
      $('#button').removeClass('adduser');
    }
    //si es imprimir se crea el icono imprimir
    if (route==='/etiquetaimprimir'){
      var button = '<span class="icon"><i class="fa-solid fa-print fa-2xl" style="color: #022a3933;"></i></span>';
      //Quitar clase adduser
      $('#button').removeClass('adduser');
    }
    if (route==='/ordendecompra'){
      var title = 'Orden de Compra ' + $(this).find('.text-container').data('title');
    }
   if (route==='/listarestanteria'){
      var button = '<span class="icon"><i class="fa-solid fa-table fa-2xl"></i></span>';
      //Quitar clase adduser
      $('#button').removeClass('adduser');
    }
    // Realizar una llamada AJAX al servidor Express para renderizar la plantilla
    $.ajax({
      url: route,
      method: 'POST',
      data: { template: templatePath},
      success: function(response) {
        $('#templateContainer').html(response);
        $('#title').html(title);
        $('#button').html(button);
      }
    });
  });
});






  
  
  

  
