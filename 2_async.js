/** Ejecucion Asincrona haciendo uso de WebAPIs sin bloquear hilo principal. */

function tarea_pesada(mensaje) {
    // Simula una tarea pesada.
    let n = 10000000000;
    while (n > 0){
        n--;
    }
    console.log(mensaje);
}

console.log('Tarea 1');

//setTimeout proviene de las WebAPIs por lo que deja de pertenecer al motor de JS.
setTimeout(() => {
    tarea_pesada('Tarea 2 - Descarga de un archivo pesado.');
}, 1000);

console.log('Tarea 3');