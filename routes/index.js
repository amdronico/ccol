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

    const IdUser = "123456789"
    const UserLogin = "Pepito Perez"
    const Alerts = 4
    // Genera el contenido para card
    const templateName = 'cards/cards.njk';
    const Title = 'Gestión Logística'
    const cards = [
      { image: '/assets/images/admin_users.png', title: 'Gestión de usuarios', template: 'adminuser/adminuser.njk', route: '/adminuser' },
      { image: '/assets/images/abastecimiento.png', title: 'Abastecimiento', template: 'cards/cards.njk', route: '/abastecimiento' },
      { image: '/assets/images/cortesproducto.png', title: 'Cortes de producto', template: 'cortesproducto.njk', route: '/cortesproducto' },
      { image: '/assets/images/asignacionremisiones.png', title: 'Asignación de remisiones', template: 'asigancionremision.njk', route: '/asigancionremision' },
      { image: '/assets/images/montacargas.png', title: 'Montacargas', template: 'montacargas.njk', route: '/montacargas' },
      { image: '/assets/images/tramitepedidos.png', title: 'Trámite de pedidos', template: 'tramitepedidos.njk', route: '/tramitepedidos' },
      { image: '/assets/images/embalaje.png', title: 'Embalaje', template: 'embalaje.njk', route: '/embalaje' },
      { image: '/assets/images/liquidacion.png', title: 'Liquidación', template: 'liquidacion.njk', route: '/liquidacion' },
      { image: '/assets/images/estadisticas.png', title: 'Estadísticas', template: 'estadisticas.njk', route: '/estadisticas' }
    ];
    // Generar el código QR
    const qrCodeDataURL = await qrcode.toDataURL(IdUser);

    res.render('dashboard/dashboard.njk', { CodeQr: qrCodeDataURL, UserLogin: UserLogin, IdUser: IdUser, Alerts: Alerts, Title: Title, templateName: templateName, cards });

  } catch (error) {
    res.status(500).send('Error al generar el código QR');
  }
});

//admin user
router.post('/adminuser', (req, res) => {
  const templatePath = req.body.template; // Obtener la ruta de la plantilla enviada desde el cliente
  //Renderizar plantilla
  const users = [
    { name: 'Elkin Mauricio Ramirez', ocupation: 'Gerente', id: 123454 },
    { name: 'Roxana Mateus', ocupation: 'Colaborador', id: 456744 },
    { name: 'Vivian Perlaza Cote', ocupation: 'Asistente', id: 898654 }
  ];
  //const adduser='<div class="col icons adduser"><span class="icon"><i class="fa-solid fa-gears fa-2xl" style="color: #022a39;"></i></span></div>'

  // Luego, envía el HTML renderizado al cliente como respuesta
  res.render(templatePath, { users });
});
//add user
router.post('/adduser', (req, res) => {
  const templatePath = req.body.template; // Obtener la ruta de la plantilla enviada desde el cliente
  //Renderizar plantilla
  var profile = ['Director/subdirector', 'Analista Logística', 'Asistente de pedidos', 'Asistente de transporte', 'Coordinador de bodega', 'Líder de bodega', 'Etiquetador',
    'Fraccionador', 'Montacarguista', 'Embalador', 'Alianzas estratégicas'];

  // Luego, envía el HTML renderizado al cliente como respuesta
  res.render(templatePath, { profiles: profile });
});
//edit user
router.post('/edituser', (req, res) => {
  const templatePath = req.body.template; // Obtener la ruta de la plantilla enviada desde el cliente
  const id = req.body.id;
  const name = req.body.name;
  const ocupation = req.body.ocupation;
  //Renderizar plantilla
  // Luego, envía el HTML renderizado al cliente como respuesta
  res.render(templatePath, { id: id, name: name, ocupation: ocupation });
});
module.exports = router;

//Abastecimiento
router.post('/abastecimiento', (req, res) => {
  const templatePath = req.body.template; // Obtener la ruta de la plantilla enviada desde el cliente
  //Renderizar plantilla
  const cards = [
    { image: '/assets/images/abastecimiento/ordencompra.png', title: 'Ordenes de compra', template: 'abastecimiento/proveedores.njk', route: '/proveedores' },
    { image: '/assets/images/abastecimiento/ubicacionproducto.png', title: 'Ubicación de productos', template: 'ubicacionproducto.njk', route: '/ubicacionproducto' },
    { image: '/assets/images/abastecimiento/etiquetadoproducto.png', title: 'Etiquetado de productos', template: 'cards/cards.njk', route: '/etiquetadoproducto' },
    { image: '/assets/images/abastecimiento/reubicacionproducto.png', title: 'Reubicación de productos', template: 'reubicacionproducto.njk', route: '/reubicacionproducto' }
  ];
  // Luego, envía el HTML renderizado al cliente como respuesta
  res.render(templatePath, { cards });
});
//Renderizado de listado de proveedores
router.post('/proveedores', (req, res) => {
  const templatePath = req.body.template; // Obtener la ruta de la plantilla enviada desde el cliente
  //Renderizar plantilla
  const cards = [
    { image: '/assets/images/abastecimiento/proveedores/centelsa.png', title: 'Centelsa', template: 'abastecimiento/ordendecompra.njk', route: '/ordendecompra' },
    { image: '/assets/images/abastecimiento/proveedores/condumex.png', title: 'Condumex', template: 'abastecimiento/ordendecompra.njk', route: '/ordendecompra' },
    { image: '/assets/images/abastecimiento/proveedores/kubiec.png', title: 'Kubiec', template: 'abastecimiento/ordendecompra.njk', route: '/ordendecompra' },
    { image: '/assets/images/abastecimiento/proveedores/nacobre.png', title: 'Nacobre', template: 'abastecimiento/ordendecompra.njk', route: '/ordendecompra' }
  ];
  // Luego, envía el HTML renderizado al cliente como respuesta
  res.render(templatePath, { cards });
});
//Rendericar el listado de las ordenes de compra
router.post('/ordendecompra', (req, res) => {
  const templatePath = req.body.template;
  const ordenes = [
    { numero: 200056, valor: 100, proveedor: 'Proveedor 1', direccion: 'Dirección 1', cantidad: 5, estado: 'Aprobada' },
    { numero: 200057, valor: 200, proveedor: 'Proveedor 2', direccion: 'Dirección 2', cantidad: 3, estado: 'Anulada' },
    { numero: 200080, valor: 150, proveedor: 'Proveedor 20', direccion: 'Dirección 20', cantidad: 7, estado: 'Aprobada' },
    { numero: 200089, valor: 150, proveedor: 'Proveedor 20', direccion: 'Dirección 20', cantidad: 7, estado: 'Anulada' },
    { numero: 200068, valor: 150, proveedor: 'Proveedor 20', direccion: 'Dirección 20', cantidad: 7, estado: 'En elaboración' },
    { numero: 200034, valor: 150, proveedor: 'Proveedor 20', direccion: 'Dirección 20', cantidad: 7, estado: 'En elaboración' },
    { numero: 200055, valor: 150, proveedor: 'Proveedor 20', direccion: 'Dirección 20', cantidad: 7, estado: 'Aprobada' },
    { numero: 200034, valor: 150, proveedor: 'Proveedor 20', direccion: 'Dirección 20', cantidad: 7, estado: 'Aprobada' },
    { numero: 200093, valor: 150, proveedor: 'Proveedor 20', direccion: 'Dirección 20', cantidad: 7, estado: 'En elaboración' },
    { numero: 200001, valor: 150, proveedor: 'Proveedor 20', direccion: 'Dirección 20', cantidad: 7, estado: 'Aprobada' },
  ];

  res.render(templatePath, { ordenes});
});

//Etiquetado de producto
router.post('/etiquetadoproducto', (req, res) => {
  const templatePath = req.body.template; // Obtener la ruta de la plantilla enviada desde el cliente
  //Renderizar plantilla
  const cards = [
    { image: '/assets/images/abastecimiento/etiquetadoproduto/imprimiretiqueta.png', title: 'Imprimir Etiqueta', template: 'abastecimiento/etiquetaimprimir.njk', route: '/etiquetaimprimir' },
    { image: '/assets/images/abastecimiento/etiquetadoproduto/etiquetarproduto.png', title: 'Etiquetar producto', template: '', route: '' }
  ];
  // Luego, envía el HTML renderizado al cliente como respuesta
  res.render(templatePath, { cards });
});
//Listado etiquetas que se van a imprimir
router.post('/etiquetaimprimir', (req, res) => {
  const templatePath = req.body.template;
  const etiquetas = [
    { referencia: 'CAB-001', descripcion: 'Cable de red Cat 6', lote: '20210501', existencia: 100, unidad: 'metros' },
    { referencia: 'CAB-002', descripcion: 'Cable HDMI 2.0', lote: '20210415', existencia: 50, unidad: 'metros' },
    { referencia: 'CAB-003', descripcion: 'Cable USB Tipo C', lote: '20210610', existencia: 200, unidad: 'unidades' },
    {referencia: 'CAB-004',descripcion: 'Cable de audio 3.5mm',lote: '20210522', existencia: 75,unidad: 'metros'},
    {referencia: 'CAB-005',descripcion: 'Cable de alimentación PC',lote: '20210430',existencia: 30,unidad: 'metros'},
    {referencia: 'CAB-006',descripcion: 'Cable VGA',lote: '20210605',existencia: 40,unidad: 'metros'},
    {referencia: 'CAB-007',descripcion: 'Cable de carga para iPhone',lote: '20210318',existencia: 150,unidad: 'unidades'},

  ];
  res.render(templatePath, { etiquetas });
});

//Detalle Orden de copra 
router.post('/detalleorden', (req, res) => {
  const remisionId = req.body.remisionId; 
  const templatePath = req.body.template;// Obtener la ruta de la plantilla enviada desde el cliente
  const detalles= [
    { referencia: 'CAB-001', descripcion: 'Cable de red Cat 6',unidad: 'metros', solicitada:'25',recibida:' ',pendiente:'25' },
    { referencia: 'CAB-002', descripcion: 'Cable HDMI 2.0', unidad: 'metros', solicitada:'45',recibida:' ',pendiente:'45' },
    { referencia: 'CAB-003', descripcion: 'Cable USB Tipo C',unidad: 'metros', solicitada:'2',recibida:' ',pendiente:'2' },
    {referencia: 'CAB-004',descripcion: 'Cable de audio 3.5mm',unidad: 'metros', solicitada:'3',recibida:' ',pendiente:'3'},
    {referencia: 'CAB-005',descripcion: 'Cable de alimentación PC',unidad: 'metros', solicitada:'67',recibida:' ',pendiente:'67'},
    {referencia: 'CAB-006',descripcion: 'Cable VGA',unidad: 'metros', solicitada:'5',recibida:' ',pendiente:'5'},
    {referencia: 'CAB-007',descripcion: 'Cable de carga para iPhone',unidad: 'metros', solicitada:'89',recibida:' ',pendiente:'89'},

  ];
  // Luego, envía el HTML renderizado al cliente como respuesta
  res.render(templatePath, { remisionId: remisionId,detalles });
});


module.exports = router;