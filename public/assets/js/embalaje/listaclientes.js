$(document).ready(function() {
    var tablaOrdenes = $('#listarClientes').DataTable({
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

    // Manejar el evento de cambio en los checkboxes de selección
    $('#listarClientes tbody').on('change', '.select-checkbox', function() {
        var $row = $(this).closest('tr');
        $row.toggleClass('selected');
        var isChecked = $(this).is(':checked');
        actualizarBoton();
    });

    // Manejar el evento de selección de una fila al hacer clic en cualquier parte de la misma
    $('#listarClientes tbody').on('click', 'tr', function() {
        var $checkbox = $(this).find('.select-checkbox');
        $checkbox.prop('checked', !$checkbox.prop('checked')).trigger('change');
    });

    // Manejar el evento de selección de una fila al hacer clic en el checkbox directamente
    $('#listarClientes tbody').on('click', '.select-checkbox', function(e) {
        e.stopPropagation();
    });

// Función para actualizar el estado del botón según la selección de filas
function actualizarBoton() {
    var filasSeleccionadas = $('#listarClientes tbody tr.selected');
    var button = '<span class="icon"><i class="fa-solid fa-receipt fa-2xl" style="color: #022a39;"></i></span>';
    var boton = $('#button').html(button);

    if (filasSeleccionadas.length > 0) {
    $('.fa-receipt').css('color', '#022a39');
    $('#button').addClass('mostrarRemisiones');
    
    } else {
    $('.fa-receipt').css('color', '#022a3929');
    $('#button').removeClass('mostrarRemisiones');
    }
}

$(document).on('click', '.mostrarRemisiones', function() {
    const templatePath = 'embalaje/etiquetaimprimir.njk'
    const route =  '/embalajeetiquetaimprimir' 
    const title = 'Imprimir Etiqueta'
    var button = '<span class="icon"><i class="fa-solid fa-print fa-2xl" style="color: #022a3933;"></i></span>';
    //Quitar clase mostrarRemisiones
    $('#button').removeClass('mostrarRemisiones');
    var clienteSeleccionado = [];
    var nombreSeleccionado = [];
    $('#listarClientes tbody tr.selected').each(function() {
    var numerocliente = $(this).find('td:eq(0)').text();
    var nombrecliente = $(this).find('td:eq(1)').text();
    clienteSeleccionado.push(numerocliente);
    nombreSeleccionado.push(nombrecliente);

    });

    $.ajax({
    url: route,
    method: 'POST',
    data: { template: templatePath,cliente:clienteSeleccionado,nombre:nombreSeleccionado},
    success: function(response) {
        $('#templateContainer').html(response);
        $('#title').html(title);
        $('#button').html(button);
        $('#button').removeClass('adduser');
    }
    });

    // Realizar la llamada ajax con los clientes seleccionados
    console.log('clientes seleccionados:', clienteSeleccionado);
});
});