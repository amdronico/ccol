$(document).ready(function() {
    var tablaOrdenes = $('#listarCortes').DataTable({
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
    // Manejar el evento de cambio en los dropdown de estado de corte
    $('#listarCortes tbody').on('change', '.estadoCorte', function() {
      $('#loader').show();
      var corteId = $(this).data('corte-id');
      var estadoSeleccionado = $(this).val();

      // Realizar la lógica para actualizar el estado de corte en el backend
      // usando el corteId y el estadoSeleccionado

      // Simulación de solicitud AJAX exitosa
      setTimeout(function() { //Quitar en producción
        // Mostrar iziToast de actualización exitosa
        $('#loader').hide();
        iziToast.success({
            position: 'topCenter',
            title: 'Actualización Exitosa',
            message: 'Estado de corte '+corteId+' actualizado correctamente'
        });
      }, 500);
    });
});