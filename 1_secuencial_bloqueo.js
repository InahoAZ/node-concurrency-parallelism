/** Ejecucion secuencial bloqueando el hilo principal */

function tarea_pesada(mensaje) {
    // Simula una tarea pesada.
    let n = 10000000000;
    while (n > 0){
        n--;
    }
    console.log(mensaje);
}

console.log('Tarea 1');
tarea_pesada('Tarea 2 - Llamada a una API');
console.log('Tarea 3');