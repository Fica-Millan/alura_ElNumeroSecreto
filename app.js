alert(
    "¡BIENVENIDO AL JUEGO DEL NÚMERO SECRETO!\n" +
    "Adivinalo en el menor número de intentos posible. Cada juego tiene un número único.\n\n" +
    "CÓMO JUGAR:\n" +
    "1. Generación del Número Secreto: En cada juego se genera un número aleatorio.\n" +
    "2. Retroalimentación: Después de cada intento, se indica si el número secreto es mayor o menor.\n" +
    "3. Límite de Intentos: Cada juego tiene un límite de 5 intentos.\n" +
    "4. Nuevo Juego: Después de ganar o haber utilizado todos los intentos puedes, iniciar un nuevo juego.\n" +
    "5. Fin del Juego: Si has jugado todas las veces posibles, se te informará.\n\n" +
    "¡Buena suerte y que empiece el juego!"
  )

let numeroSecreto = 0;
let intentos = 0;
let listaNumeroSorteados = []; 
let numeroMaximo = 20;
let maximoIntentos = 5;

function asignarTextoElemento (elemento, texto){
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function verificarIntento(){
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    
    if (numeroDeUsuario === numeroSecreto){
        //Si en usuario acierta:
        asignarTextoElemento('p',`Felicitaciones! acertaste en ${intentos} ${(intentos === 1) ?'intento':'intentos'}.`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        //Cuando el usuario no acierta:
        if (numeroDeUsuario > numeroSecreto){
            asignarTextoElemento('p','El número secreto es menor.');
        } else {
            asignarTextoElemento('p','El número secreto es mayor.');
        }
        intentos++;
        limpiarCaja();
        if (intentos > maximoIntentos){ 
            //Si llega a los intentos disponibles sin adivinar:
            alert(`Llegaste al número máximo de ${maximoIntentos} intentos`);
            document.getElementById('reiniciar').removeAttribute('disabled');
            return;
        }    
    }
    return;
}

function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

function condicionesIniciales() {
    asignarTextoElemento('h1','Adivina el número secreto');
    asignarTextoElemento('p',`Debes indicar un número del 1 al ${numeroMaximo}.`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}

function reiniciarJuego() {
    //limpiar la caja
    limpiarCaja();
    //indicar mensaje de intervalos de numero
    //generar el numero aleatorio
    //inicializar el numero de intentos
   condicionesIniciales();
    //desabilitar el boton de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled','true');    
}

function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;
    console.log(numeroGenerado);
    console.log(listaNumeroSorteados);
    //Si ya se sortearon todos los numeros de la lista:
    if(listaNumeroSorteados.length == numeroMaximo){
        asignarTextoElemento('p','Ya se sortearon todos los números posibles.');
    }else{ //para seguir jugando:
        //si el número generado esta incluido, se genera un nuevo numero.
        if(listaNumeroSorteados.includes(numeroGenerado)){
            return generarNumeroSecreto();
        }else{ //si no está en la lista, se agrega.
            listaNumeroSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

condicionesIniciales();