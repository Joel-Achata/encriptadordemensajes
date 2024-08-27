const d = document;
const textArea = d.querySelector(".form-input");
const imagenmuneco = d.querySelector(".result-img");
const loaderthunder = d.querySelector(".loader");
const resulttitle = d.querySelector(".result-title");
const resulttext = d.querySelector(".result-text");
const resultsubtittle=d.querySelector(".result-subtittle");
const btnencriptar = d.querySelector(".form-btn");
const btndesencriptar = d.querySelector("#btn-desencriptar");
const btncopy = d.querySelector(".result--btn");
const alertMsj = d.querySelector(".alert-msj");
const btnCopy = d.querySelector("#btn-copy");

const llaves = [
    ["e", "enter"],
    ["i", "imes"],
    ["a", "ai"],
    ["o", "ober"],
    ["u", "ufat"]
];


const maxReloads = 8;
const reloadTimeout = 60000;

const logoAlura = document.getElementById("logo-alura");
logoAlura.addEventListener("click", () => {
    let reloadCount = +localStorage.getItem("reloads") || 0;
    let lastReload = +localStorage.getItem("lastReload") || 0;
    if (Date.now() - lastReload > reloadTimeout) reloadCount = 0;

    if (reloadCount < maxReloads) {
        localStorage.setItem("reloads", ++reloadCount);
        localStorage.setItem("lastReload", Date.now());
        location.reload(); 
    } else {
        alert("Límite de recargas alcanzado. Espera 1 minuto."); 
    }
});


// validar el texto
function validarTexto(mensaje) {
    if (mensaje.trim() === "") {
        return false;
    }

    const regex = /^[a-z\s]*$/; // Solo letras minúsculas y espacios
    return regex.test(mensaje);
}

resulttext.addEventListener('input', function() {
    this.style.height = 'auto'; // Restablece la altura para calcularla nuevamente
    this.style.height = (this.scrollHeight) + 'px'; // Ajusta la altura al contenido
});
// Función para encriptar
function encriptarMensaje(mensaje) {
    let mensajeEncriptado = "";
    for (let i = 0; i < mensaje.length; i++) {
        let letra = mensaje[i];
        let encriptada = letra;
        for (let j = 0; j < llaves.length; j++) {
            if (letra === llaves[j][0]) {
                encriptada = llaves[j][1]; // Reemplaza la letra por su equivalente encriptado
                break; // Termina el bucle cuando se encuentra la correspondencia
            }
        }
        mensajeEncriptado += encriptada;
    }
    return mensajeEncriptado;
}

// Función para desencriptar
function desencriptarMensaje(mensaje) {
    let mensajeDesencriptado = mensaje;
    for (let i = 0; i < llaves.length; i++) {
        let regex = new RegExp(llaves[i][1], 'g');
        mensajeDesencriptado = mensajeDesencriptado.replace(regex, llaves[i][0]);
    }
    return mensajeDesencriptado;
}

// Evento de entrada en el textarea
textArea.addEventListener("input", (e) => {
    let texto = e.target.value;
    if (validarTexto(texto)) {
        alertMsj.style.display = "none";
        imagenmuneco.style.display = "none";
        loaderthunder.classList.remove("hidden");
        resulttitle.textContent = "Obteniendo el mensaje...";
        resulttext.textContent = "";
        resultsubtittle.textContent = "" ;

    } else {
        alertMsj.style.display = "block";
        alertMsj.textContent = "Por favor, ingresa solo letras minúsculas sin acentos ni caracteres especiales";
    }
});

// Función del botón encriptar
btnencriptar.addEventListener("click", (e) => {
    e.preventDefault();
    let mensaje = textArea.value;
    if (validarTexto(mensaje)) {
        let mensajeEncriptado = encriptarMensaje(mensaje);
        resulttext.textContent = mensajeEncriptado;
        btncopy.style.display = "block"; // Mostrar el botón de copiar
        resulttitle.textContent = "El mensaje encriptado es:";
        alertMsj.style.display = "none";
        loaderthunder.classList.add("hidden"); // Esconde el loader después de encriptar
        document.querySelector('.result').classList.add('show-result-text');


    } else {
        resulttitle.textContent = "";
        resulttext.textContent = "";
        alertMsj.style.display = "block";
    }
});

// Función del botón desencriptar
btndesencriptar.addEventListener("click", (e) => {
    e.preventDefault();
    let mensaje = textArea.value;
    if (validarTexto(mensaje)) {
        let mensajeDesencriptado = desencriptarMensaje(mensaje);
        resulttitle.textContent = "El mensaje desencriptado es:";
        resulttext.textContent = mensajeDesencriptado;
        alertMsj.style.display = "none";
        btncopy.style.display = "block"; // Mostrar el botón de copiar
        loaderthunder.classList.add("hidden"); // Esconde el loader
        document.querySelector('.result').classList.add('show-result-text');

    } else {
        resulttitle.textContent = "";
        resulttext.textContent = "";
        alertMsj.style.display = "block";
    }
});

// Evento del botón copiar
btnCopy.addEventListener("click", () => {
    let copytext = resulttext.textContent;
    navigator.clipboard.writeText(copytext).then(() => {
        loaderthunder.classList.add("hidden");
        resulttitle.textContent = "El texto se copió";
        btnCopy.classList.add("hidden"); // Oculta el botón de copiar después de copiar
        btnPaste.classList.remove("hidden"); // Muestra el botón de pegar
        resulttext.textContent = "";
    });
});


