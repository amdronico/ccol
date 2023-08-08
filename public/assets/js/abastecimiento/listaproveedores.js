

$(document).ready(function() {
    var tablaOrdenes = $('#listarProveedores').DataTable({
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
    $('#listarProveedores tbody').on('change', '.select-checkbox', function() {
        var $row = $(this).closest('tr');
        $row.toggleClass('selected');
        var isChecked = $(this).is(':checked');
        actualizarBoton();
    });

    // Manejar el evento de selección de una fila al hacer clic en cualquier parte de la misma
    $('#listarProveedores tbody').on('click', 'tr', function() {
        var $checkbox = $(this).find('.select-checkbox');
        $checkbox.prop('checked', !$checkbox.prop('checked')).trigger('change');
    });

    // Manejar el evento de selección de una fila al hacer clic en el checkbox directamente
    $('#listarProveedores tbody').on('click', '.select-checkbox', function(e) {
        e.stopPropagation();
    });

// Función para actualizar el estado del botón según la selección de filas
function actualizarBoton() {
    var filasSeleccionadas = $('#listarProveedores tbody tr.selected');
    var button = '<span class="icon"><i class="fa-solid fa-receipt fa-2xl" style="color: #022a39;"></i></span>';
    var boton = $('#button').html(button);

    if (filasSeleccionadas.length > 0) {
    $('.fa-receipt').css('color', '#022a39');
    $('#button').addClass('mostrarOrdenes');
    
    } else {
    $('.fa-receipt').css('color', '#022a3929');
    $('#button').removeClass('mostrarOrdenes');
    }
}

$(document).on('click', '.mostrarOrdenes', function() {
    const templatePath = 'abastecimiento/etiquetaimprimir.njk'
    const route =  '/etiquetaimprimir' 
    const title = 'Imprimir Etiqueta'
    var button = '<span class="icon"><i class="fa-solid fa-print fa-2xl" style="color: #022a3933;"></i></span>';
    //Quitar clase mostrarOrdenes
    $('#button').removeClass('mostrarOrdenes');
    var proveedorSeleccionado = [];
    $('#listarProveedores tbody tr.selected').each(function() {
    var numeroProveedor = $(this).find('td:first').text();
    proveedorSeleccionado.push(numeroProveedor);
    });

    $.ajax({
    url: route,
    method: 'POST',
    data: { template: templatePath,proveedor:proveedorSeleccionado},
    success: function(response) {
        $('#templateContainer').html(response);
        $('#title').html(title);
        $('#button').html(button);
    }
    });

    // Realizar la llamada ajax con los proveedores seleccionados
    console.log('Proveedores seleccionados:', proveedorSeleccionado);
});
});