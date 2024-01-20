
let inputBuffer = '';
let historial = [];

function concatenar(valor) {
    inputBuffer += valor;
    actualizarDisplay();
}

function operacion(operador) {
    inputBuffer += ` ${operador} `;
    actualizarDisplay();
}

function borrarCaracter() {
    inputBuffer = inputBuffer.slice(0, -1);
    actualizarDisplay();
}

function cerrarParentesis() {
    inputBuffer += ')';
    actualizarDisplay();
}

function calcular() {
    try {
        const resultado = evaluarExpresion(inputBuffer);
        historial.push(`${inputBuffer} = ${resultado}`);
        inputBuffer = resultado.toString();
        actualizarDisplay();
        guardarHistorialEnStorage();
    } catch (error) {
        alert('Error en la expresión.');
        limpiar();
    }
}

function evaluarExpresion(expresion) {
    return new Function('return ' + expresion)();
}

function limpiar() {
    inputBuffer = '';
    actualizarDisplay();
}

function actualizarDisplay() {
    $('#display').val(inputBuffer);
}

function calcularHistorial() {
    cargarHistorialDesdeStorage()
        .then((historialCargado) => {
            if (historialCargado.length === 0) {
                alert('No hay historial disponible.');
            } else {
                alert('Historial de Operaciones:\n\n' + historialCargado.join('\n'));
            }
        })
        .catch((error) => {
            console.error('Error al cargar el historial:', error);
        });
}

function guardarHistorialEnStorage() {
    localStorage.setItem('historial', JSON.stringify(historial));
}

function cargarHistorialDesdeStorage() {
    return new Promise((resolve, reject) => {
        try {
            const historialGuardado = localStorage.getItem('historial');

            if (historialGuardado) {
                historial = JSON.parse(historialGuardado);
            }

            resolve(historial);
        } catch (error) {
            reject(error);
        }
    });
}

function agregarOperadorAvanzado(operador) {
    inputBuffer += operador;
    actualizarDisplay();
}

function raizCubica() {
    agregarOperadorAvanzado('Math.cbrt(');
}

function agregarNegativo() {
    concatenar('-');
}

$('#sqrt').click(function () {
    agregarOperadorAvanzado('Math.sqrt(');
});

$('#cbrt').click(function () {
    raizCubica();
});

$('#power').click(function () {
    agregarOperadorAvanzado('Math.pow(');
});

$('#log').click(function () {
    agregarOperadorAvanzado('Math.log(');
});

$('#sin').click(function () {
    agregarOperadorAvanzado('Math.sin(');
});

$('#cos').click(function () {
    agregarOperadorAvanzado('Math.cos(');
});

$('#tan').click(function () {
    agregarOperadorAvanzado('Math.tan(');
});

$('#negativo').click(function () {
    agregarNegativo();
});


$('#borrar').click(function () {
    borrarCaracter();
});

$('#cerrarParentesis').click(function () {
    cerrarParentesis();
});


$(document).keydown(function (event) {
    const teclaPresionada = event.key;

    if (/[0-9/*+\-.]/.test(teclaPresionada)) {
        concatenar(teclaPresionada);
    } else if (teclaPresionada === 'Enter') {
        calcular();
    } else if (teclaPresionada === 'Backspace') {
        borrarCaracter();
    } else if (teclaPresionada === 'Escape') {
        limpiar();
    }
});

cargarHistorialDesdeStorage();