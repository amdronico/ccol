$(document).ready(function() {
    // Inicializar DataTables con la extensión Select
    var tablaOrdenes = $('#tablaOrdenes').DataTable({
        select: {
          style: 'single'
        },
        language: {
              url: "/js/dataTables.Spanish.json"
            },
        pageLength: 6,
        scrollY: '250px',
        scrollCollapse: true,
        paging: true,
        responsive: true
    });
  
    // Manejar el evento de selección de una fila
    $('#tablaOrdenes tbody').on('click', 'i.view-icon', function() {
      var $row = $(this).closest('tr'); // Obtener la fila más cercana al icono de visualización
      var remisionId = $(this).data('remision');
      var template = 'abastecimiento/detalleremision.njk';
      $.ajax({
        url: '/detalleorden',
        type: 'POST',
        data: { remisionId: remisionId, template: template },
        success: function(response) {
          $('#lightboxContent').html(response);
          $('#editLightbox').fadeIn();
  
          // Remover la clase de selección de todas las filas excepto la seleccionada
          $row.siblings().removeClass('selected');
  
          // Agregar o quitar la clase de selección en la fila seleccionada
          $row.toggleClass('selected');
        },
        error: function(error) {
          console.error('Error al obtener el detalle de la orden de compra:', error);
        }
      });
    });
  
  });