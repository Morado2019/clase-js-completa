export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    }

    if (input.validity.valid) {
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = ""

    } else {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML =
            mostrarMensajeDeError(tipoDeInput, input);
    }

}
const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",

];



const mensajesDeError = {
    nombre: {
        valueMissing: "este campo no puede estar vacio "
    },
    email: {
        valueMissing: "este campo no puede estar vacio ",
        typeMismatch: "el correo no es valido"
    },
    password: {
        valueMissing: "este campo no puede estar vacio",
        patternMismatch: "debe contener mayusculas numeros y caracteres"
    },
    nacimiento: {
        valueMissing: "este campo no puede estar vacio ",
        customError: "debes tener 18 de edad",
    },
    numero: {
        valueMissing: "este campo no puede estar vacio",
        patternMismatch: "el formato requerido es xxxxxxxxxx 10 numeros"
    },
    direcion: {
        valueMissing: "este campo no puede estar vacio",
        patternMismatch: "la direccion debe contener entre 10 y 40 caracteres"
    },
    cuidad: {
        valueMissing: "este campo no puede estar vacio",
        patternMismatch: "la cuidad debe contener entre 10 y 40 caracteres"
    },
    estado: {
        valueMissing: "este campo no puede estar vacio",
        patternMismatch: "el estado debe contener entre 10 y 40 caracteres"
    },


};

const validadores = {
    nacimiento: (input) => validarNacimiento(input),
};


function mostrarMensajeDeError(tipoDeInput, input) {
    let mensaje = "";
    tipoDeErrores.forEach((error) => {
        if (input.validity[error]) {
            console.log(tipoDeInput, error);
            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoDeInput][error]);
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    });

    return mensaje;
}

function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if (!mayorEdad(fechaCliente)) {
        mensaje = "deber tener al menos 18 años de edad"
    }
    input.setCustomValidity(mensaje);

}
function mayorEdad(fecha) {
    const fechaActual = new Date()
    const diferenciaFechas = new Date
        (   fecha.getUTCFullYear() + 18,
            fecha.getUTCMonth(),
            fecha.getUTCDate()
        );
    return diferenciaFechas <= fechaActual;
}