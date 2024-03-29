$(document).ready(function() {
    // Inicializar DataTables con la extensión Select
    var tablaOrdenes = $('#tablaEstibas').DataTable({
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
    $('#tablaEstibas tbody').on('click', 'i.view-icon', function() {
      var $row = $(this).closest('tr'); // Obtener la fila más cercana al icono de visualización
      var estibaId = $(this).data('estiba');
      var template = 'abastecimiento/detalleestiba.njk';
      $.ajax({
        url: '/detalleestiba',
        type: 'POST',
        data: { estibaId: estibaId, template: template },
        success: function(response) {
          $('#lightboxContent').html(response);
          $('#editLightbox').fadeIn();

          // Remover la clase de selección de todas las filas excepto la seleccionada
          $row.siblings().removeClass('selected');

          // Agregar o quitar la clase de selección en la fila seleccionada
          $row.toggleClass('selected');
        },
        error: function(error) {
          console.error('Error al obtener el detalle de la estiba:', error);
        }
      });
    });

    // Agregar evento clic para las etiquetas <i> con clase "print-icon"
    $('.fa-print').click(function() {
      var estibaId = $(this).data('estiba'); // Obtener el ID de la estiba desde el atributo data-estiba

      // Verificar si el valor del atributo data-estiba es válido
      if (estibaId !== undefined && estibaId !== null && estibaId !== '') {
        console.log('ID de la estiba seleccionada:', estibaId);

        // Mostrar la confirmación de tipo utilizando iziToast
        iziToast.question({
          timeout: false,
          close: false,
          overlay: true,
          displayMode: 'once',
          id: 'imprimirEtiqueta',
          title: 'Reimprimir Etiqueta',
          message: '¿Desea reimprimir la etiqueta de la estiba '+estibaId+'?',
          position: 'center',
          buttons: [
            ['<button><b>Sí</b></button>', function(instance, toast) {
              instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
              // Lógica para imprimir la etiqueta"
              iziToast.success({
              title: 'Notificación',
              message: 'La etiqueta se ha enviado a reimprimir',
              position: 'topCenter',
              progressBarColor: '#57b846'
            });
            }],
            ['<button>Cancelar</button>', function(instance, toast) {
              instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
            }]
          ]
        });


      } else {
        console.log('El ID de la estiba no es válido.');
      }
    });
  });