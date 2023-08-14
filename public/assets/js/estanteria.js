$(document).ready(function() {
    $('.estanteria-link').click(function() {
       const  title =  'Estantería'
       const  route = '/estanteria'
       const templatePath = 'cards/cards.njk'
        //llamado  ajax para renderizar la plantilla 
        $.ajax({
            url: route,
            method: 'POST',
            data: { template: templatePath},
            success: function(response) {
              $('#templateContainer').html(response);
              $('#title').html(title);
            }
          }); 
    });



    
});