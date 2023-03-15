# node-concurrency-parallelism
Codigo utilizado en presentacion de Paradigmas y Lenguajes de programacion para ejemplificar conceptos de Concurrencia y Paralelismo, y como se implementa en Javascript

Para ejecutar tienes que tener la ultima version de Nodejs Instalado (https://nodejs.org/en/)

Una vez en el directorio raiz ejecutar `npm install` para instalar las dependencias.

Desde la terminal se ejecutan los ejemplos usando `node nombre_archivo.js`.


En el caso del ejemplo del ejemplo paralelo (worker_ejemplos/numeros_primos_paralelo.js) por defecto creara 2 hilos pero se puede
modificar esto por parametros al ejecutar el script de la siguiente manera

```console
node worker_ejemplos/numeros_primos_paralelos.js 4
``` 
Siendo 4 la cantidad de hilos en este caso.
