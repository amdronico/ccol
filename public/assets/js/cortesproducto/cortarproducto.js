$(document).ready(function() {
    var tablaOrdenes = $('#listaCarretes').DataTable({
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

    // Agregar evento clic para las etiquetas <i> con clase "view-icon"
    $('.view-icon').click(function() {
      var carreteId = $(this).data('carrete'); // Obtener el ID del carrete desde el atributo data-id
      console.log(carreteId);
     var template = 'cortesproducto/detallecorte.njk';
        $.ajax({
          url: '/detallecorte',
          type: 'POST',
          data: { carreteId: carreteId, template: template },
          success: function(response) {
            $('#lightboxContent').html(response);
            $('#editLightbox').fadeIn();
          },
          error: function(error) {
            console.error('Error al obtener el detalle de la estiba:', error);
          }
        });
    });
  });