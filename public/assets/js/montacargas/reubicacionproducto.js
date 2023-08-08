   // Accede al elemento de video y al botón de escaneo
   const video = document.getElementById('video');
   const scanBtn = document.getElementById('scan-btn');
   const resultDiv = document.getElementById('result');

   // Comprueba si el navegador admite la API de MediaDevices y getUserMedia
   if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
     // Solicita acceso a la cámara del dispositivo
     navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
       .then(function(stream) {
         // Establece el flujo de video como origen para el elemento de video
         video.srcObject = stream;
         video.play();
       })
       .catch(function(error) {
         console.error('Error al acceder a la cámara:', error);
       });

     // Escucha el clic del botón de escaneo
     scanBtn.addEventListener('click', function() {
       // Crea un objeto de detección de códigos QR
       const qrScanner = new Instascan.Scanner({ video: video });

       // Escucha el evento de detección de códigos QR
       qrScanner.addListener('scan', function(content) {
         // Muestra el resultado en la página
         resultDiv.innerHTML = 'Contenido del código QR: ' + content;
         
         // Detiene la detección después de leer el código QR
         qrScanner.stop();
       });

       // Inicia la detección de códigos QR
       Instascan.Camera.getCameras()
         .then(function(cameras) {
           if (cameras.length > 0) {
             qrScanner.start(cameras[0]);  // Utiliza la primera cámara encontrada
           } else {
             console.error('No se encontraron cámaras.');
           }
         })
         .catch(function(error) {
           console.error('Error al obtener cámaras:', error);
         });
     });
   } else {
     console.error('La API getUserMedia no está disponible en este navegador.');
   }