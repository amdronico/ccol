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
    const cards = [
      { image: '/assets/images/admin_users.png', title: 'Gestión de usuarios' },
      { image: '/assets/images/abastecimiento.png', title: 'Abastecimiento' },
      { image: '/assets/images/cortesproducto.png', title: 'Cortes de producto' },
      { image: '/assets/images/asignacionremisiones.png', title: 'Asignación de remisiones' },
      { image: '/assets/images/montacargas.png', title: 'Montacargas' },
      { image: '/assets/images/tramitepedidos.png', title: 'Trámite de pedidos' },
      { image: '/assets/images/embalaje.png', title: 'Embalaje' },
      { image: '/assets/images/liquidacion.png', title: 'Liquidación' },
      { image: '/assets/images/estadisticas.png', title: 'Estadísticas' }
    ];
    // Generar el código QR
    const qrCodeDataURL = await qrcode.toDataURL(IdUser);

    res.render('dashboard.njk', { CodeQr:qrCodeDataURL, UserLogin: UserLogin,IdUser: IdUser,Alerts:Alerts,cards});


  } catch (error) {
    res.status(500).send('Error al generar el código QR');
  }
});





module.exports = router;