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

    // Manejar el evento de cambio en los checkboxes de selección
    $('#tablaDetalle tbody').on('change', '.select-checkbox', function() {
      var $row = $(this).closest('tr'); // Obtener la fila más cercana al checkbox
      $row.toggleClass('selected'); // Agregar o quitar la clase de selección en la fila seleccionada
      actualizarBotonEnviar();
    });
        // Manejar el evento de selección de una fila al hacer clic en cualquier parte de la misma
    $('#tablaDetalle tbody').on('click', 'tr', function() {
      var $checkbox = $(this).find('.select-checkbox');
      $checkbox.prop('checked', !$checkbox.prop('checked')).trigger('change'); // Cambiar el estado del checkbox y disparar el evento de cambio
    });

    // Función para actualizar el estado del botón "Enviar Abastecimiento" según la selección de filas
    function actualizarBotonEnviar() {
      var filasSeleccionadas = $('#tablaDetalle tbody tr.selected');

      if (filasSeleccionadas.length > 0) {
        $('.crearEtiqueta').prop('disabled', false);
      } else {
        $('.crearEtiqueta').prop('disabled', true);
      }
    }

    // Manejar el evento de clic en el botón "Crear Etiqueta"
    $('.crearEtiqueta').on('click', function() {
      var filasSeleccionadas = $('#tablaDetalle tbody tr.selected');

      if (filasSeleccionadas.length > 0) {
        // Mostrar la confirmación de tipo utilizando iziToast
        iziToast.question({
          timeout: false,
          close: false,
          overlay: true,
          displayMode: 'once',
          id: 'tipoEtiqueta',
          title: 'Selecciona el tipo de etiqueta:',
          message: '¿Deseas crear una etiqueta de tipo "Estiba" o "Carrete"?',
          position: 'center',
          buttons: [
            ['<button><b>Estiba</b></button>', function(instance, toast) {
              instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
              // Lógica para crear etiqueta de tipo "Estiba"
              crearEtiqueta('Estiba');
            }],
            ['<button><b>Carrete</b></button>', function(instance, toast) {
              instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
              // Lógica para crear etiqueta de tipo "Carrete"
              crearEtiqueta('Carrete');
            }],
            ['<button>Cancelar</button>', function(instance, toast) {
              instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
              // Lógica para cancelar la creación de etiqueta
              console.log('Creación de etiqueta cancelada');
            }]
          ]
        });
      }
    });
    // Función para crear la etiqueta según el tipo seleccionado
    function crearEtiqueta(tipo) {
        //Mostrar el Cargando
        $('#loader').show()
        var productosSelecionados = [];
        //Tomar la filas seleccionadas [referencias de los productos]
          $('#tablaDetalle tbody tr.selected').each(function() {
            var producto = $(this).find('td:first').text(); // Obtener el número de orden de la primera columna
            productosSelecionados.push(producto);
          });
        if (tipo === 'Estiba') {
            var tipo=1
            //Ruta generación de etiqueta
            var template = 'abastecimiento/etiquetaestiba.njk';
         }else{
            var tipo=2
            //Ruta generación de etiqueta
            var template = 'abastecimiento/etiquetacarrete.njk';
         }
        
          setTimeout(function() { //Timeout sólo para mabiente de desarrollo [prueba de cargando]
                    // Hacer la solicitud para renderizado de la etiqueta generada
              $.ajax({
                url: '/etiqueta',
                type: 'POST',
                data: { template: template,tipo:tipo,productos: productosSelecionados },
                success: function(response) {
                  // Manejar la respuesta del servidor en caso de éxito
                        $('#lightboxContent').html(response);
                        $('#editLightbox').fadeIn();
                        //se quita la clase orden de compra para mostrar el lightBox cuadrado
                        $('#lightboxContent').removeClass('ordencompra');
                        //Ocultar Cargando
                        $('#loader').hide();
                },
                error: function(error) {
                  // Manejar el error en caso de fallo en la solicitud AJAX
                  console.error('Error al solicitar la etiqueta:', error);
                  $('#loader').hide();
                }
              });
          }, 500);  // Quitar en producción
      }
      //Cerra ventana emergente 
      $(document).on('click', '.cerrarBtn', function() {
        var lightbox = $(this).closest('.lightbox'); // Encontrar el contenedor del lightbox
        lightbox.fadeOut(); // Ocultar el lightbox
      });
      //Acción imprimir etiqueta
      $(document).on('click', '.imprimirBtn', function() {
        var lightbox = $(this).closest('.lightbox'); // Encontrar el contenedor del lightbox
        lightbox.fadeOut(); // Ocultar el lightbox
         //alerta para eviso de envío a impresión
         iziToast.success({
                title: 'Aviso',
                message: 'La solicitud de impresión se realizó correctamente.',
                position: 'topCenter'
              });
        /*Código para imprimir etiqueta*/
      });
  });