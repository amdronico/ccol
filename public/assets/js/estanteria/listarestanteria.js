

$(document).ready(function() {
    var tablaOrdenes = $('#listarEstanterias').DataTable({
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

    //Llamado ventana modal para crear una nueva estantería.
   $('#button').click(function(){
    var template = 'estanteria/crearestanteria.njk';
    $.ajax({
        url: '/crearestanteria',
        type: 'POST',
        data: {template:template},
        success: function(response) {
          // Manejar la respuesta del servidor en caso de éxito
                $('#lightboxContent').html(response);
                $('#editLightbox').fadeIn();
                //se quita la clase orden de compra para mostrar el lightBox cuadrado
                $('#lightboxContent').removeClass('ordencompra');

         },
        error: function(error) {
          // Manejar el error en caso de fallo en la solicitud AJAX
          console.error('Error al enviar las órdenes:', error);
        }
      });
    });
});