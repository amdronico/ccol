$(document).ready(function() {

  $('#imprimirBtn').on('click', function() {
    var selectedRows = tablaEtiquetas.rows({ selected: true }).data();

    if (selectedRows.length > 0) {
      iziToast.question({
        timeout: false,
        close: false,
        overlay: true,
        displayMode: 'once',
        id: 'confirmPrint',
        zindex: 99999999,
        title: 'Confirmación',
        message: '¿Desea imprimir los registros seleccionados?',
        position: 'center',
        buttons: [
          ['<button><b>Sí</b></button>', function (instance, toast) {
            // Aquí puedes realizar la acción de impresión
            instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
          }, true],
          ['<button>No</button>', function (instance, toast) {
            instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
          }]
        ]
      });
    } else {
      iziToast.error({
        title: 'Error',
        message: 'No ha seleccionado ningún registro.'
      });
    }
  });
  
});