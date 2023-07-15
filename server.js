const express = require('express');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');
const routes = require('./routes');
const path = require('path');
// Importar el módulo body-parser
const bodyParser = require('body-parser');

// Cargar variables de entorno desde el archivo .env
dotenv.config();

const app = express();
// Configurar el middleware para el análisis del cuerpo de la solicitud
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));


// Configurar el middleware de body-parser
app.use(bodyParser.urlencoded({ extended: true, parameterLimit: 500000, limit: '500mb' }));


//Directorio principal
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/dashboard')));

//Rutas a recursos
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use('/css', express.static(path.join(__dirname, 'public/assets/css')));
app.use('/js', express.static(path.join(__dirname, 'public/assets/js')));

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