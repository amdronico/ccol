$(document).ready(function() {
    // Inicializar DataTables con la extensión Select
    var tablaOrdenes = $('#tablaOrdenes').DataTable({
      language: {
        url: "/js/dataTables.Spanish.json"
      },
      pageLength: 6,
      scrollY: '250px',
      scrollCollapse: true,
      paging: true,
      responsive: true
    });

  // Manejar el evento de cambio en los checkboxes de selección
  $('#tablaOrdenes tbody').on('change', '.select-checkbox', function() {
    var $row = $(this).closest('tr'); // Obtener la fila más cercana al checkbox
    $row.toggleClass('selected'); // Agregar o quitar la clase de selección en la fila seleccionada
    var isChecked = $(this).is(':checked'); // Verificar si el checkbox está marcado o desmarcado
    actualizarBoton();
  });

  // Manejar el evento de selección de una fila al hacer clic en cualquier parte de la misma
  $('#tablaOrdenes tbody').on('click', 'tr', function() {
    var $checkbox = $(this).find('.select-checkbox');
    $checkbox.prop('checked', !$checkbox.prop('checked')).trigger('change'); // Cambiar el estado del checkbox y disparar el evento de cambio
  });

  // Manejar el evento de selección de una fila al hacer clic en el checkbox directamente
  $('#tablaOrdenes tbody').on('click', '.select-checkbox', function(e) {
    e.stopPropagation(); // Evitar que el evento de clic en el checkbox propague hasta la fila
  });

  // Restablecer la selección de las filas al limpiar los filtros o cambiar de página
  /* tablaOrdenes.on('draw.dt', function() {
      $('#tablaOrdenes tbody tr.selected').removeClass('selected');
    });*/
      // Función para actualizar el estado del botón según la selección de filas
      function actualizarBoton() {
        var filasSeleccionadas = $('#tablaOrdenes tbody tr.selected');
        var button = '<span class="icon"><i class="fa-solid fa-print fa-2xl" style="color: #022a39;"></i></span>';  
        var boton =  $('#button').html(button);

        if (filasSeleccionadas.length > 0) {
          $('.fa-print').css('color', '#022a39');
          $('#button').addClass('mostrarArticulos');
        } else {
          $('.fa-print').css('color', '#022a3929');
          $('#button').removeClass('mostrarArticulos');
        }
      }
       // Asignar evento de clic al botón cuando tenga la clase mostrarArticulos
      $(document).on('click', '.mostrarArticulos', function() {
        // Obtener las órdenes seleccionadas
        var template = 'abastecimiento/detalleetiqueta.njk';
        var ordenesSeleccionadas = [];
        $('#tablaOrdenes tbody tr.selected').each(function() {
          var numeroOrden = $(this).find('td:first').text(); // Obtener el número de orden de la primera columna
          ordenesSeleccionadas.push(numeroOrden);
        });
          // Enviar las órdenes seleccionadas al servidor mediante AJAX
          $.ajax({
            url: '/detallesetiquetas',
            type: 'POST',
            data: { ordenes: ordenesSeleccionadas,template: template  },
            success: function(response) {
              // Manejar la respuesta del servidor en caso de éxito
                    $('#lightboxContent').html(response);
                    $('#editLightbox').fadeIn();
                    //se coloca la clase orden de compra para mostrar el lightBox rectangular
                    $('#lightboxContent').addClass('ordencompra');
             },
            error: function(error) {
              // Manejar el error en caso de fallo en la solicitud AJAX
              console.error('Error al enviar las órdenes:', error);
            }
          });
      });

});