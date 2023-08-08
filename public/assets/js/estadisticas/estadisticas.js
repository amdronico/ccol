$(document).ready(function() {
    // Datos de ejemplo
    var rotationData = {
      labels: ['A', 'B', 'C', 'D', 'E'],
      series: [10, 20, 5, 15, 8]
    };
    var productividadData = {
      labels: ['Usuario 1', 'Usuario 2', 'Usuario 3', 'Usuario 4', 'Usuario 5'],
      series: [8, 12, 5, 10, 3]
    };

    // Datos de ejemplo para la gráfica de indicador de cortes
    var cortesData = {
      labels: ['Corte 1', 'Corte 2', 'Corte 3', 'Corte 4', 'Corte 5'],
      series: [20, 10, 15, 12, 18]
    };

          // Datos de ejemplo para la gráfica de indicador de novedades
    var novedadesData = {
      labels: ['Novedad 1', 'Novedad 2', 'Novedad 3', 'Novedad 4', 'Novedad 5'],
      series: [5, 8, 12, 15, 10]
    };

    // Datos de ejemplo para la gráfica de indicador de accidentes
    var accidentesData = {
      labels: ['Accidente 1', 'Accidente 2', 'Accidente 3', 'Accidente 4', 'Accidente 5'],
      series: [3, 6, 4, 7, 5]
    };

    // Configuración de la gráfica de rotación de productos
    var rotationOptions = {
      chart: {
        type: 'line',
        height: 300,
        stacked: true,
        toolbar: {
          show: true,
          exportMenu: {
            csv: false,
            svg: false,
            png: true
          }
        }
      },
      title: {
      display: true,
      text: 'Rotación de productos',
    },
      series: [{
        name: 'Rotación de productos',
        data: rotationData.series
      }],
      xaxis: {
        categories: rotationData.labels
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: '100%'
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    };

  // Configuración de la gráfica de productividad por usuarios
        var productividadOptions = {
          chart: {
            type: 'line',
            height: 300,
            toolbar: {
              show: true,
              exportMenu: {
                csv: false,
                svg: false,
                png: true
              }
            }
          },
          title: {
            text: 'Productividad por usuarios',
            display: true
          },
          series: [{
            name: 'Productividad por usuarios',
            data: productividadData.series
          }],
          xaxis: {
            categories: productividadData.labels
          },
          yaxis: {
            title: {
              text: 'Cantidad'
            }
          }
        };

              // Configuración de la gráfica de indicador de cortes
        var cortesOptions = {
          chart: {
            type: 'donut',
            height: 300,
            toolbar: {
              show: true,
              exportMenu: {
                csv: false,
                svg: false,
                png: true
              }
            }
          },
          title: {
            text: 'Indicador de cortes',
            display: true
          },
          series: cortesData.series,
          labels: cortesData.labels
        };

          // Configuración de la gráfica de indicador de novedades
        var novedadesOptions = {
          chart: {
            type: 'pie',
            height: 300,
            toolbar: {
              show: true,
              exportMenu: {
                csv: false,
                svg: false,
                png: true
              }
            }
          },
          title: {
            text: 'Indicador de novedades',
            display: true

          },
          series: novedadesData.series,
          labels: novedadesData.labels
        };

            // Configuración de la gráfica de indicador de accidentes
        var accidentesOptions = {
          chart: {
            type: 'pie',
            height: 300,
            toolbar: {
              show: true,
              exportMenu: {
                csv: false,
                svg: false,
                png: true
              }
            }
          },
          title: {
            text: 'Indicador de accidentes',
            display:true
          },
          
          series: accidentesData.series,
          labels: accidentesData.labels
        };
        // Crear gráficas
        var rotationChart = new ApexCharts(document.querySelector('#chartRotacion'), rotationOptions);
        rotationChart.render();

        var productividadChart = new ApexCharts(document.querySelector('#charProductividad'), productividadOptions);
        productividadChart.render();

        var indicadorChart = new ApexCharts(document.querySelector('#chartCortes'), cortesOptions);
        indicadorChart.render();
        
        var novedadesChart = new ApexCharts(document.querySelector('#chartNovedades'), novedadesOptions);
        novedadesChart.render();

        var accidentesChart = new ApexCharts(document.querySelector('#chartAccidentes'), accidentesOptions);
        accidentesChart.render();
  });