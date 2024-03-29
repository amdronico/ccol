$(document).ready(function() {
    var tablaEtiquetas = $('#tablaDetalle').DataTable({
      language: {
        url: "/js/dataTables.Spanish.json"
      },
      pageLength: 6,
      scrollY: '250px',
      scrollCollapse: true,
      paging: true,
      responsive: true
    });
      // Agregar evento clic para las etiquetas <i> con clase "desasociar-icon"
    $('.desasociar-icon').click(function() {
      var referenciaId = $(this).data('producto'); // Obtener el ID de la referencia desde el atributo data-producto

      // Verificar si el valor del atributo data-producto es válido
      if (referenciaId !== undefined && referenciaId !== null && referenciaId !== '') {
        console.log('ID de la referencia seleccionada:', referenciaId);
        // Realizar acciones adicionales con el ID de la referencia, como enviarlo al backend para desasociar, etc.
                  // Mostrar la confirmación de tipo utilizando iziToast
        iziToast.question({
          timeout: false,
          close: false,
          overlay: true,
          displayMode: 'once',
          id: 'desasociarProducto',
          title: 'Desasociar Producto',
          message: '¿Desea desasociar el producto '+referenciaId+'?',
          position: 'center',
          buttons: [
            ['<button><b>Sí</b></button>', function(instance, toast) {
              instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
              // Ocultar la fila del producto
              $('#' + referenciaId).hide();
              iziToast.success({
              title: 'Notificación',
              message: 'El producto se ha desasociado correctamente',
              position: 'topCenter',
              progressBarColor: '#57b846'
              
            });
            }],
            ['<button>Cancelar</button>', function(instance, toast) {
              instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
            }]
          ]
        });
      }
    });

  });