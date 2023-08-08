$(document).ready(function() {
    var tablaOrdenes = $('#listaCortar').DataTable({
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
  });