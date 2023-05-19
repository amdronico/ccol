const express = require('express');
const qrcode = require('qrcode');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index.njk');
});

router.get('/dashboard', async (req, res) => {
  
  try {

    const IdUser="123456789"; // Datos para el código QR
    const UserLogin="Pepito Perez"

    // Generar el código QR
    const qrCodeDataURL = await qrcode.toDataURL(IdUser);

    res.render('dashboard.njk', { CodeQr:qrCodeDataURL, UserLogin: UserLogin,IdUser: IdUser});
  } catch (error) {
    res.status(500).send('Error al generar el código QR');
  }
});

module.exports = router;