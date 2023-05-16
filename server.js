const express = require('express');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');
const routes = require('./routes');
const path = require('path');

// Cargar variables de entorno desde el archivo .env
dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/assets', express.static(path.join(__dirname, 'public/assets')));
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
app.use('/images', express.static(path.join(__dirname, 'public/images')));


// Configurar Nunjucks como motor de plantillas
nunjucks.configure('views', {
  autoescape: true,
  express: app
});

// Rutas
app.use('/', routes);

// Iniciar el servidor
app.listen(process.env.PORT || 3000, () => {
  console.log(`Servidor iniciado en http://localhost:${process.env.PORT || 3000}`);
});