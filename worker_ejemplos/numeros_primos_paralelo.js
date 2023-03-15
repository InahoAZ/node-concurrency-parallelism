"use strict";
//Importamos lo esencial de la libreria worker_threads para este caso.
const {
    Worker,
    isMainThread,
    parentPort,
    workerData,
} = require("worker_threads");

const min = 2;
let primes = [];

//Funcion que genera los numeros primos
function generatePrimes(start, range) {
    let isPrime = true;
    let end = start + range;
    for (let i = start; i < end; i++) {
        for (let j = min; j < Math.sqrt(end); j++) {
            if (i !== j && i % j === 0) {
                isPrime = false;
                break;
            }
        }
        if (isPrime) {
            primes.push(i);
        }
        isPrime = true;
    }
}

//Generamos n numeros primos paralelamente
if (isMainThread) {
    const max = 1e7;
    const threadCount = +process.argv[2] || 2;
    const threads = new Set();
    console.log(`Running with ${threadCount} threads...`);

    //Realizamos una Descomposición de Dominio segun la cantidad de threads a crear.
    const range = Math.ceil((max - min) / threadCount);
    let start = min;

    /** Creo un worker por cada porcion del dominio pasandole por el constructor 
    informacion del rango a calcular. */
    for (let i = 0; i < threadCount - 1; i++) {
        const myStart = start;
        threads.add(
            new Worker(__filename, { workerData: { start: myStart, range } })
        );
        start += range;
    }
    threads.add(
        new Worker(__filename, {
            workerData: { start, range: range + ((max - min + 1) % threadCount) },
        })
    );

    //Creo manejadores de eventos por cada worker. Quedan escuchando en segundo plano.
    //Se ejecutan una vez el worker dispare uno de esos eventos
    for (let worker of threads) {
        worker.on("error", (err) => {
            throw err;
        });
        //Cuando un worker finaliza su ejecucion, se ejecuta esto.
        worker.on("exit", () => {
            threads.delete(worker);
            console.log(`Thread exiting, ${threads.size} running...`);
            if (threads.size === 0) {
                console.log(primes.join("\n"));
            }
        });
        //Cuando el hilo principal recibe un mensaje con postMessage se ejecuta esto.
        worker.on("message", (msg) => {
            primes = primes.concat(msg);
        });
    }
} else {
    //A traves de la informacion recibida por workerData, genero los numeros primos en el rango provisto.
    generatePrimes(workerData.start, workerData.range);

    //Mando al hilo principal los numeros primos en el rango provisto al worker por mensaje.
    parentPort.postMessage(primes);
}
