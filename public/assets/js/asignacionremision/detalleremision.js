$(document).ready(function() {
    var tablaEtiquetas = $('#AuxiliaresRemision').DataTable({
      language: {
        url: "/js/dataTables.Spanish.json"
      },
      pageLength: 6,
      scrollY: '250px',
      scrollCollapse: true,
      paging: true,
      responsive: true
    });
      // Manejar el evento de cambio de selección del dropdown para asignar una tarea
    $('.asignacion-select').change(function() {
      // Obtener el valor seleccionado de la lista desplegable
      var asignacion = $(this).val();
       // Obtener el valor de la celda "Nombre" de la fila actual
      var nombre = $(this).closest('tr').find('#nombre').text();
      // Mostrar confirmación con iziToast
      iziToast.question({
        timeout: false,
        close: false,
        overlay: true,
        displayMode: 'once',
        id: 'question',
        zindex: 99999999,
        title: 'Confirmación',
        message: '¿Asignar tarea ' + asignacion + ' a ' + nombre + '?',
        position: 'center',
        progressBarColor: '#57b846',
        buttons: [
          ['<button>Si</button>', function(instance, toast) {
            instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
            // Código para realizar la asignación de la tarea

            // Mostrar mensaje de éxito con iziToast
            iziToast.success({
              title: 'Aviso',
              message: 'Asignación realizada correctamente',
              position: 'topCenter',
              progressBarColor: '#57b846'
            });
          },true],
            ['<button>No</button>', function(instance, toast) {
            instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
          }]
        ]
      });
    });
  });