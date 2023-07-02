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
  // Datos del formulario de inicio de sesión desde req.body
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
      { image: '/assets/images/cortesproducto.png', title: 'Cortes de producto', template: 'cards/cards.njk', route: '/cortesproducto' },
      { image: '/assets/images/asignacionremisiones.png', title: 'Asignación de remisiones', template: 'asignacionremision/asignacionremision.njk', route: '/asigancionremision' },
      { image: '/assets/images/montacargas.png', title: 'Montacargas', template: 'montacargas.njk', route: '/montacargas' },
      { image: '/assets/images/tramitepedidos.png', title: 'Trámite de pedidos', template: 'tramitepedidos/tramitepedidos.njk', route: '/tramitepedidos' },
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
    { numero: 200052, valor: 150, proveedor: 'Proveedor 20', direccion: 'Dirección 20', cantidad: 7, estado: 'Aprobada' },
  ];

  res.render(templatePath, { ordenes});
});
//Detalle Orden de copra 
router.post('/detalleorden', (req, res) => {
  const remisionId = req.body.remisionId; 
  const templatePath = req.body.template;// Obtener la ruta de la plantilla enviada desde el cliente
  const opcionesUnidadEmpaque  = [
   {value:'1',label:'Seleccionar'},
   {value:'2',label:'Incorrecta'},
   {value:'3',label:'Correcta'}
  ]
  
  const detalles= [
    { referencia: 'CAB-001', descripcion: 'Cable de red Cat 6',unidad: 'metros', solicitada:'25',recibida:'0',pendiente:'20' },
    { referencia: 'CAB-002', descripcion: 'Cable HDMI 2.0', unidad: 'metros', solicitada:'45',recibida:'0',pendiente:'4' },
    { referencia: 'CAB-003', descripcion: 'Cable USB Tipo C',unidad: 'metros', solicitada:'2',recibida:'0',pendiente:'2'},
    {referencia: 'CAB-004',descripcion: 'Cable de audio 3.5mm',unidad: 'metros', solicitada:'3',recibida:'0',pendiente:'3'},
    {referencia: 'CAB-005',descripcion: 'Cable de alimentación PC',unidad: 'metros', solicitada:'67',recibida:'0',pendiente:'1'},
    {referencia: 'CAB-006',descripcion: 'Cable VGA',unidad: 'metros', solicitada:'5',recibida:'0',pendiente:'5'},
    {referencia: 'CAB-007',descripcion: 'Cable de carga para iPhone',unidad: 'metros', solicitada:'89',recibida:'0',pendiente:'80'},

  ];
  // Luego, envía el HTML renderizado al cliente como respuesta
  res.render(templatePath, { remisionId: remisionId,detalles,opcionesUnidadEmpaque });
});

//Etiquetado de producto
router.post('/etiquetadoproducto', (req, res) => {
  const templatePath = req.body.template; // Obtener la ruta de la plantilla enviada desde el cliente
  //Renderizar plantilla
  const cards = [
    { image: '/assets/images/abastecimiento/etiquetadoproduto/imprimiretiqueta.png', title: 'Imprimir Etiqueta', template: 'abastecimiento/listaproveedores.njk', route: '/listaproveedores' },
    //{ image: '/assets/images/abastecimiento/etiquetadoproduto/imprimiretiqueta.png', title: 'Imprimir Etiqueta', template: 'abastecimiento/etiquetaimprimir.njk', route: '/etiquetaimprimir' }
    { image: '/assets/images/abastecimiento/etiquetadoproduto/etiquetarproduto.png', title: 'Etiquetar producto', template: 'abastecimiento/etiquetaproducto.njk', route: '/etiquetaproducto' }
  ];
  // Luego, envía el HTML renderizado al cliente como respuesta
  res.render(templatePath, { cards });
});

//Mostrar lista con los  proveedores habilitados.
router.post('/listaproveedores', (req, res) => {
  const templatePath = req.body.template;
  const proveedores = [
    { id: 12345, proveedor: 'Condumex', direccion: 'Dirección 1', estado: 'Vigente' },
    { id: 44567, proveedor: 'Centelsa', direccion: 'Dirección 1', estado: 'Vigente' },
    { id: 23556, proveedor: 'Kubiec', direccion: 'Dirección 1', estado: 'Vigente' }
  ];

  res.render(templatePath, { proveedores});
});

//Listado ordenes de compra a las que se les va a generar una una etiqueta
router.post('/etiquetaimprimir', (req, res) => {
  const templatePath = req.body.template;
  const proveedor = req.body.proveedor;
  const ordenes = [
    { numero: 200056, valor: 100, proveedor: 'Centelsa', direccion: 'Dirección 1', cantidad: 5, estado: 'Aprobada' },
    { numero: 200057, valor: 200, proveedor: 'Centelsa', direccion: 'Dirección 2', cantidad: 3, estado: 'Anulada' },
    { numero: 200080, valor: 150, proveedor: 'Centelsa', direccion: 'Dirección 20', cantidad: 7, estado: 'Aprobada' },
    { numero: 200089, valor: 150, proveedor: 'Centelsa', direccion: 'Dirección 20', cantidad: 7, estado: 'Anulada' },
    { numero: 200068, valor: 150, proveedor: 'Centelsa', direccion: 'Dirección 20', cantidad: 7, estado: 'En elaboración' },
    { numero: 200034, valor: 150, proveedor: 'Centelsa', direccion: 'Dirección 20', cantidad: 7, estado: 'En elaboración' },
    { numero: 200055, valor: 150, proveedor: 'Centelsa', direccion: 'Dirección 20', cantidad: 7, estado: 'Aprobada' },
    { numero: 200034, valor: 150, proveedor: 'Centelsa', direccion: 'Dirección 20', cantidad: 7, estado: 'Aprobada' },
    { numero: 200093, valor: 150, proveedor: 'Centelsa', direccion: 'Dirección 20', cantidad: 7, estado: 'En elaboración' },
    { numero: 200052, valor: 150, proveedor: 'Centelsa', direccion: 'Dirección 20', cantidad: 7, estado: 'Aprobada' },
  ];

  res.render(templatePath, { ordenes});
});
//Detalle etiquetas a imprimir
router.post('/detallesetiquetas', (req, res) => {
  //Ordenes recibidas para buscar y devolver los productos
  const ordenes = req.body.ordenes; 
  const templatePath = req.body.template;// Obtener la ruta de la plantilla enviada desde el cliente
  const detalles= [
    { referencia: 'CAB-001', descripcion: 'Cable de red Cat 6',unidad: 'metros', solicitada:'25',recibida:'0',pendiente:'20' },
    { referencia: 'CAB-002', descripcion: 'Cable HDMI 2.0', unidad: 'metros', solicitada:'45',recibida:'0',pendiente:'4' },
    { referencia: 'CAB-003', descripcion: 'Cable USB Tipo C',unidad: 'metros', solicitada:'2',recibida:'0',pendiente:'2'},
    {referencia: 'CAB-004',descripcion: 'Cable de audio 3.5mm',unidad: 'metros', solicitada:'3',recibida:'0',pendiente:'3'},
    {referencia: 'CAB-005',descripcion: 'Cable de alimentación PC',unidad: 'metros', solicitada:'67',recibida:'0',pendiente:'1'},
    {referencia: 'CAB-006',descripcion: 'Cable VGA',unidad: 'metros', solicitada:'5',recibida:'0',pendiente:'5'},
    {referencia: 'CAB-007',descripcion: 'Cable de carga para iPhone',unidad: 'metros', solicitada:'89',recibida:'0',pendiente:'80'},

  ];
  // Luego, envía el HTML renderizado al cliente como respuesta
  res.render(templatePath, { detalles });
});
router.post('/etiqueta', async (req, res) => {
  const templatePath = req.body.template;// Obtener la ruta de la plantilla enviada desde el cliente
  const tipo = req.body.tipo;
  const IdEtiqueta='Etiqueta';
  if(tipo==1){
    var titulo='Estiba';
    var texto1 = 'A.12AWG CU VER 100TH-NN2' ;
    var texto2 = 'A.12AWG CU ROJ 100TH-NN2';
    var texto3 = 'A.12AWG CU NEG 100TH-NN2';
    var eutipo = 'R100';
  }else{
    var titulo='Empaque Carrete';
    var texto1 = 'A.12AWG CU VER 100TH-NN2' ;
    var letracolor = 'V' //letra en función del color
    var eutipo = 'LOTE';
    var cant = '300';
    var media = 'Mts.'
    var peso = '300'
    var medidapeso = 'Kgs.'
    var lote = '123456'
    
  }
  var proveedor = 'Condumex';
  // se debe enviar el color que se desee representar completamente en el circulo
  //const color='black';
  //const color='red';
  const color='green';
  
   // Generar el código QR de la etiqueta
   try {
    // Generar el código QR
    const qrCodeDataURL = await qrcode.toDataURL(IdEtiqueta);
    // Luego, envía el HTML renderizado al cliente como respuesta
   res.render(templatePath,{CodeQr: qrCodeDataURL,titulo,color,texto1,texto2,texto3,eutipo,proveedor,cant,media,peso,medidapeso,lote,letracolor});
  } catch (error) {
    res.status(500).send('Error al generar el código QR');
  }
});
//Etiquetar producto carga todas las estibas
router.post('/etiquetaproducto', (req, res) => {
  //Listar todas las estibas para ver su contenido
  const templatePath = req.body.template;// Obtener la ruta de la plantilla enviada desde el cliente
  const estibas= [
    { estiba: '12345', ue: 'R1000',proveedor: 'Condumex', etiqueta : '' },
    { estiba: '45823', ue: 'R300',proveedor: 'Centelsa', etiqueta : '' },
    { estiba: '63845', ue: 'E345',proveedor: 'Kubiec', etiqueta : '' },
    { estiba: '23495', ue: 'R5677',proveedor: 'Nacobre', etiqueta : '' }
  ];
  // Luego, envía el HTML renderizado al cliente como respuesta
  res.render(templatePath, { estibas });
});

//Etiquetar producto carga el detalle de la estiba seleccionada
router.post('/detalleestiba', (req, res) => {
  //Listar el detalle de la estibarecibida
  estibaId = req.body.estibaId;
  const templatePath = req.body.template;// Obtener la ruta de la plantilla enviada desde el cliente
  const detalles= [
    {referencia: 'CAB-001',descripcion: 'Cable de red Cat 6',unidad: 'metros',cantidad: '5' },
    {referencia: 'CAB-002',descripcion: 'Cable HDMI 2.0', unidad: 'metros',cantidad: '3' },
    {referencia: 'CAB-003',descripcion: 'Cable USB Tipo C',unidad: 'metros',cantidad: '50'},
    {referencia: 'CAB-004',descripcion: 'Cable de audio 3.5mm',unidad: 'metros',cantidad: '4'},
    {referencia: 'CAB-005',descripcion: 'Cable de alimentación PC',unidad: 'metros',cantidad: '12'},
    {referencia: 'CAB-006',descripcion: 'Cable VGA',unidad: 'metros',cantidad: '5'},
    {referencia: 'CAB-007',descripcion: 'Cable de carga',unidad: 'metros',cantidad: '9'},

  ];
  // Luego, envía el HTML renderizado al cliente como respuesta
  res.render(templatePath, { detalles,estibaId });
});


//Cortes de producto
router.post('/cortesproducto', (req, res) => {
  const templatePath = req.body.template; // Obtener la ruta de la plantilla enviada desde el cliente
  //Renderizar plantilla
  const cards = [
    { image: '/assets/images/cortesproducto/cortarproducto.png', title: 'Cortar Producto', template: 'cortesproducto/cortarproducto.njk', route: '/cortarproducto' },
    { image: '/assets/images/cortesproducto/listarcortes.png', title: 'Listar Cortes', template: 'cortesproducto/listarcortes.njk', route: '/listarcortes' }
  ];
  // Luego, envía el HTML renderizado al cliente como respuesta
  res.render(templatePath, { cards });
});

//Listado de cortes a realizar
router.post('/listarcortes', (req, res) => {
  const templatePath = req.body.template;
  const estados =[
    'Pendiente','En curso','Realizado'
  ]

  const cortes = [
    { numero: 200056, proveedor: 'Centelsa',  cantidad: 5, medida: 'Metros', estadocorte: 'Pendiente'},
    { numero: 200057, proveedor: 'Centelsa',  cantidad: 5, medida: 'Metros', estadocorte: 'Pendiente'}
  ];

  res.render(templatePath, { cortes,estados});
});

//Trámite de pedidos
router.post('/tramitepedidos', (req, res) => {
  const templatePath = req.body.template;
  const estados =[
    'Pendiente','En curso','Realizado'
  ]
  const ordenpedidos = [
    { ordenpedido: 200056, cliente: 'Sergio Ávila Azcona',  fecha: '22/02/2023',fechaprocesamiento:'22/04/2023', estadoorden: 'Pendiente'},
    { ordenpedido: 200056, cliente: 'Carlos Alirio Rodríguez',  fecha: '04/05/2023',fechaprocesamiento:'23/06/2023', estadoorden: 'Pendiente'}
  ];
  res.render(templatePath, { ordenpedidos,estados});
});

//Lista de remisiones
router.post('/asigancionremision', (req, res) => {
  const templatePath = req.body.template;
  const remisones = [
    { remision: 200056, cantidades: 56,proveedor:'Condumex',  fecha: '22/02/2023', estado: 'Pendiente'},
    { remision: 200055, cantidades: 38,proveedor:'Kubiec',  fecha: '22/02/2023', estado: 'Pendiente'},
    { remision: 200089, cantidades: 30,proveedor:'Centelsa',  fecha: '22/02/2023', estado: 'Pendiente'},
    { remision: 200090, cantidades: 50,proveedor:'Nacobre',  fecha: '22/02/2023', estado: 'Pendiente'}
  ];
  res.render(templatePath, { remisones});
});
 //Detalle remisión
router.post('/detalleremision', (req, res) => {
  const templatePath = req.body.template;
  const remisionId = req.body.remisionId;
  const encabezado = ['Trámite', 'Alistamiento', 'Corte', 'Liquidación', 'Embalaje', 'Envío'];
  const auxiliares = [
    {tramite: 'Juan Pérez [jperez]', alistamiento: 'María López [mlopez]', corte: 'Pedro Rodríguez [prodriguez]', liquidacion: 'Ana García [agarcia]',
    embalaje: 'Luisa Martínez [lmartinez]', envio: 'Roberto Sánchez [rzanchez]'}
  ];
  const listaauxiliares =[
    {usuario: 'cmartinez', nombre: 'Carlos Andrés Martinez', avance: 50, asignacion: ''},
    {usuario: 'lgonzalez', nombre: 'Laura González', avance: 50, asignacion: ''},
    {usuario: 'alopez', nombre: 'Ana López', avance: 80, asignacion: ''},
    {usuario: 'cmorales', nombre: 'Carolina Morales', avance: 30, asignacion: ''},
    {usuario: 'esanchez', nombre: 'Eduardo Sánchez', avance: 78, asignacion: ''},
    {usuario: 'gcastro', nombre: 'Gabriela Castro', avance: 90, asignacion: ''}
  ]

  res.render(templatePath, { encabezado,auxiliares,listaauxiliares,remisionId});
});

module.exports = router;