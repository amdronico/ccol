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

    // Habilitar la edición de los campos "Cant. Recibida"
    $('#tablaDetalle tbody').on('click', '.editable', function() {
      var $input = $('<input type="number" class="form-control">');
      var originalValue = $(this).text();
      $input.val(originalValue);
      $(this).html($input);
      $input.focus();
    });

    // Escuchar el evento de cambio en los campos "Cant. Recibida"
    $('#tablaDetalle tbody').on('change', '.editable', function() {
      var $input = $(this);
      var $row = $input.closest('tr');
      var newValue = parseFloat($input.val());
      var pendiente = parseFloat($input.data('pendiente'));

      if (isNaN(newValue)) {
        // Si no se ingresa un número válido, establecer el valor en cero
        newValue = 0;
      }

      // Validar que la cantidad recibida no sea mayor a la solicitada
      if (newValue > pendiente) {
        newValue = pendiente; // Establecer el valor máximo permitido
      }

      $input.val(newValue);
      var row = tablaEtiquetas.row($row).index();
      var pendienteColumnIndex = tablaEtiquetas.columns().header().toArray().indexOf('Cant. Pendiente');

      // Actualizar la cantidad pendiente en la fila modificada
      var currentPendiente = pendiente - newValue;
      tablaEtiquetas.cell(row, pendienteColumnIndex).data(currentPendiente);

      // Actualizar el campo "Cant. Pendiente" en las demás filas
      tablaEtiquetas.rows().every(function() {
        var currentRow = this.nodes().to$();

        if (!currentRow.is($row)) {
          var currentPendiente = parseFloat(tablaEtiquetas.cell(currentRow, pendienteColumnIndex).data());
          tablaEtiquetas.cell(currentRow, pendienteColumnIndex).data(currentPendiente);
        }
      });
    });

    // Escuchar el evento de clic en el botón "Guardar Abastecimiento"
    $('.guardarAbastecimiento').on('click', function() {
      iziToast.question({
        timeout: false,
        close: false,
        overlay: true,
        displayMode: 'once',
        id: 'question',
        zindex: 99999999,
        title: 'Confirmación',
        message: '¿Está seguro de enviar el abastecimiento?',
        position: 'center',
        buttons: [
          ['<button><b>Sí</b></button>', function(instance, toast) {
            instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');

            // Cerrar la ventana modal
            $('.lightbox').hide();
            // Validar las cantidades pendientes
            
            var cantidadesPendientes = [];
            $('#tablaDetalle tbody tr').each(function() {
              var pendiente = parseFloat($(this).find('.editable').data('pendiente'));
              var recibida = parseFloat($(this).find('.editable').val());
              if (recibida < pendiente) {
                cantidadesPendientes.push(pendiente);
              }
            });

            // Notificar al departamento de compras si hay cantidades pendientes
            if (cantidadesPendientes.length > 0) {
              iziToast.warning({
                title: 'Aviso',
                message: 'Se notificará al departamento de compras sobre las cantidades pendientes.',
                position: 'topCenter'
              });

            } else {
              iziToast.success({
                title: 'Aviso',
                message: 'El abastecimiento se envió correctamente.',
                position: 'topCenter'
              });

            }

            // Realizar las acciones necesarias para enviar el abastecimiento
            // ...

          }, true],
          ['<button>No</button>', function(instance, toast) {
            instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
          }]
        ]
      });
    });
  });