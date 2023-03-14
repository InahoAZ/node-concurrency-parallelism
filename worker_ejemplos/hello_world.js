
//Libreria propia de Nodejs equivalente a Web Workers de Js
const { Worker, isMainThread, parentPort } = require('worker_threads');

if (isMainThread) {
    // Se ejecuta solo en el hilo principal.
    
    // Creamos el worker (copias de este mismo script).
    const worker = new Worker(__filename);
    // Escuchamos los mensajes, y cada vez que llegue uno lo imprimimos.
    worker.on('message', (msg) => { console.log(msg); });
} else {
    // Se ejecuta solo en el worker.
    // Envia un mensaje al hilo principal.
    parentPort.postMessage('Hello world!');
}


