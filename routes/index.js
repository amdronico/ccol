const express = require('express');
const qrcode = require('qrcode');
const controller = require('../controllers/authController');
const router = express.Router();
//Ruta para renderizar el login de la aplicación
router.get('/', (req, res) => {
  res.render('login.njk');
});

// Ruta para manejar la solicitud de inicio de sesión
router.post('/login', (req, res) => {
  // Obtén los datos del formulario de inicio de sesión desde req.body
  const { username, password } = req.body;

  // Llama a la función login en tu controlador, pasando los datos necesarios
  const result = controller.login(username, password);

  // Haz algo con el resultado,
  if (result.success) {
    res.redirect('/dashboard');
  } else {
    res.render('login.njk', { error: result.error });
  }
});

router.get('/dashboard', async (req, res) => {
  try {
    // Datos para el código QR

    const IdUser="123456789" 
    const UserLogin="Pepito Perez"
    const Alerts=4
    // Genera el contenido para card
    const templateName = 'cards/cards.njk';
    const Title = 'Gestión Logística'
    const cards = [
      { image: '/assets/images/admin_users.png', title: 'Gestión de usuarios', template:'adminuser/adminuser.njk', route:'/adminuser'},
      { image: '/assets/images/abastecimiento.png', title: 'Abastecimiento', template:'cards/cards.njk',route:'/abastecimiento'},
      { image: '/assets/images/cortesproducto.png', title: 'Cortes de producto', template:'cortesproducto.njk',route:'/cortesproducto'},
      { image: '/assets/images/asignacionremisiones.png', title: 'Asignación de remisiones' , template:'asigancionremision.njk',route:'/asigancionremision'},
      { image: '/assets/images/montacargas.png', title: 'Montacargas', template:'montacargas.njk',route:'/montacargas'},
      { image: '/assets/images/tramitepedidos.png', title: 'Trámite de pedidos', template:'tramitepedidos.njk' ,route:'/tramitepedidos'},
      { image: '/assets/images/embalaje.png', title: 'Embalaje' , template:'embalaje.njk',route:'/embalaje'},
      { image: '/assets/images/liquidacion.png', title: 'Liquidación', template:'liquidacion.njk' ,route:'/liquidacion'},
      { image: '/assets/images/estadisticas.png', title: 'Estadísticas' , template:'estadisticas.njk',route:'/estadisticas'}
    ];
    // Generar el código QR
    const qrCodeDataURL = await qrcode.toDataURL(IdUser);

    res.render('dashboard/dashboard.njk', { CodeQr:qrCodeDataURL, UserLogin: UserLogin,IdUser: IdUser,Alerts:Alerts,Title:Title,templateName:templateName,cards});

  } catch (error) {
    res.status(500).send('Error al generar el código QR');
  }
});

 //admin user
 router.post('/adminuser', (req, res) => {
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

//Abastecimiento
router.post('/abastecimiento', (req, res) => {
  const templatePath = req.body.template; // Obtener la ruta de la plantilla enviada desde el cliente
  //Renderizar plantilla
  const cards = [
    { image: '/assets/images/ordencompra.png', title: 'Ordenes de compra', template:'abastecimiento/proveedores.njk', route:'/proveedores'},
    { image: '/assets/images/ubicacionproducto.png', title: 'Ubicación de productos', template:'ubicacionproducto.njk',route:'/ubicacionproducto' },
    { image: '/assets/images/etiquetadoproducto.png', title: 'Etiquetado de productos', template:'etiquetadoproducto.njk', route:'/etiquetadoproducto'},
    { image: '/assets/images/reubicacionproducto.png', title: 'Reubicación de productos', template:'reubicacionproducto.njk',route:'/reubicacionproducto' }
  ];
  // Luego, envía el HTML renderizado al cliente como respuesta
  res.render(templatePath,{ cards });
});

router.post('/proveedores', (req, res) => {
  const templatePath = req.body.template; // Obtener la ruta de la plantilla enviada desde el cliente
  //Renderizar plantilla
  const cards = [
    { image: '/assets/images/proveedores/centelsa.png', title: 'Centelsa', template:'abastecimiento/ordendecompra.njk', route:'/ordendecompra'},
    {image: '/assets/images/proveedores/condumex.png', title: 'Condumex', template:'abastecimiento/ordendecompra.njk', route:'/ordendecompra'},
    {image: '/assets/images/proveedores/kubiec.png', title: 'Kubiec', template:'abastecimiento/ordendecompra.njk', route:'/ordendecompra'},
    {image: '/assets/images/proveedores/nacobre.png', title: 'Nacobre', template:'abastecimiento/ordendecompra.njk', route:'/ordendecompra'}
  ];
  // Luego, envía el HTML renderizado al cliente como respuesta
  res.render(templatePath,{ cards });
});

router.post('/ordendecompra', (req, res) => {
  const templatePath = req.body.template;
  const ordenes = [
    { numero: 1, valor: 100, proveedor: 'Proveedor 1', direccion: 'Dirección 1', cantidad: 5,estado: 'aprobada' },
    { numero: 2, valor: 200, proveedor: 'Proveedor 2', direccion: 'Dirección 2', cantidad: 3,estado: 'anulada' },
    { numero: 20, valor: 150, proveedor: 'Proveedor 20', direccion: 'Dirección 20', cantidad: 7 ,estado: 'aprobada'},
    { numero: 20, valor: 150, proveedor: 'Proveedor 20', direccion: 'Dirección 20', cantidad: 7,estado: 'anulada' },
    { numero: 20, valor: 150, proveedor: 'Proveedor 20', direccion: 'Dirección 20', cantidad: 7,estado: 'en elaboración' },
    { numero: 20, valor: 150, proveedor: 'Proveedor 20', direccion: 'Dirección 20', cantidad: 7 ,estado: 'en elaboración'},
    { numero: 20, valor: 150, proveedor: 'Proveedor 20', direccion: 'Dirección 20', cantidad: 7,estado: 'aprobada' },
    { numero: 20, valor: 150, proveedor: 'Proveedor 20', direccion: 'Dirección 20', cantidad: 7 ,estado: 'aprobada'},
    { numero: 20, valor: 150, proveedor: 'Proveedor 20', direccion: 'Dirección 20', cantidad: 7,estado: 'en elaboración' },
    { numero: 20, valor: 150, proveedor: 'Proveedor 20', direccion: 'Dirección 20', cantidad: 7 ,estado: 'aprobada'},
  ];

  res.render(templatePath, { ordenes });
});


module.exports = router;