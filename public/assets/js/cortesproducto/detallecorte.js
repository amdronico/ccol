$(document).ready(function() {
    var tablaOrdenes = $('#cortes').DataTable({
      language: {
        url: "/js/dataTables.Spanish.json"
      },
      pageLength: 5,
      scrollY: '250px',
      scrollCollapse: true,
      paging: true,
      responsive: true
    });
        // Escuchar el evento de clic en el botón "Guardar corte"
    $('.guardarCorte').on('click', function() {
        iziToast.question({
        timeout: false,
        close: false,
        overlay: true,
        displayMode: 'once',
        id: 'question',
        zindex: 99999999,
        title: 'Confirmación',
        message: '¿Está seguro de generar corte?',
        position: 'center',
        buttons: [
          ['<button><b>Sí</b></button>', function(instance, toast) {
            instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
            iziToast.success({
                title: 'Aviso',
                message: 'El corte se generó correctamente',
                position: 'topCenter'
              });
            // Cerrar la ventana modal
             $('.lightbox').hide();

            // Realizar las acciones necesarias para enviar el corte
            // ...
          }, true],
          ['<button>No</button>', function(instance, toast) {
            instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
          }]
        ]
      });
     });
  });