$(document).ready(function() {
    var tablaOrdenes = $('#listarPedidos').DataTable({
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
    $('#listarPedidos tbody').on('change', '.estadoPedido', function() {
      var pedidoId = $(this).data('pedido-id');
      var estadoSeleccionado = $(this).val();
      console.log('estadoSeleccionado :'+estadoSeleccionado);
    });
});