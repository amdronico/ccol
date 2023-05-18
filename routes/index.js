const express = require('express');
const qrcode = require('qrcode');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index.njk');
});

router.get('/dashboard', async (req, res) => {
  try {
    const qrData = 'https://www.oscarsierra.com'; // Datos para el código QR

    // Generar el código QR
    const qrCodeDataURL = await qrcode.toDataURL(qrData);

    res.render('dashboard.njk', { qrCodeDataURL });
  } catch (error) {
    res.status(500).send('Error al generar el código QR');
  }
});

module.exports = router;