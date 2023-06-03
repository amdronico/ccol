
const express = require('express');
const router = express.Router();
 //admin user
 router.post('/adminuser/adminuser', (req, res) => {
    const templatePath = req.body.template; // Obtener la ruta de la plantilla enviada desde el cliente
    //Renderizar plantilla
    const users = [
      { name: 'Elkin Mauricio Ramirez', ocupation:'Gerente', id: 123454 },
      { name: 'Roxana Mateus', ocupation:'Colaborador', id:456744 },
      { name: 'Vivian Perlaza Cote',ocupation:'Asistente', id: 898654 }
    ];
    //const adduser='<div class="col icons adduser"><span class="icon"><i class="fa-solid fa-gears fa-2xl" style="color: #022a39;"></i></span></div>'
    
    // Luego, envía el HTML renderizado al cliente como respuesta
    res.render(templatePath,{ users});
  });
  //add user
  router.post('/adduser', (req, res) => {
    const templatePath = req.body.template; // Obtener la ruta de la plantilla enviada desde el cliente
    //Renderizar plantilla
    var profile = ['Director/subdirector', 'Analista Logística', 'Asistente de pedidos','Asistente de transporte','Coordinador de bodega','Líder de bodega','Etiquetador',
    'Fraccionador','Montacarguista','Embalador','Alianzas estratégicas'];
  
    // Luego, envía el HTML renderizado al cliente como respuesta
    res.render(templatePath,{ profiles: profile});
  });
  //edit user
  router.post('/edituser', (req, res) => {
    const templatePath = req.body.template; // Obtener la ruta de la plantilla enviada desde el cliente
    const id = req.body.id;
    const name = req.body.name;
    const ocupation = req.body.ocupation;
    //Renderizar plantilla
    // Luego, envía el HTML renderizado al cliente como respuesta
    res.render(templatePath,{ id:id, name:name,ocupation:ocupation});
  });
  module.exports = router;