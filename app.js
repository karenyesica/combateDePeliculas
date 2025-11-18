// Nav
const nav = document.getElementById("nav");
const abrirMenu = document.getElementById("menuToggle");
const cerrarMenu = document.getElementById("menuCerrar");

// Botones
const btnCartasOponente = document.getElementById("cartas-oponente");
const btnMisCartas = document.getElementById("mis-cartas");
const btnVerResultado = document.getElementById("ver-resultado");
const btnReiniciar = document.getElementById("reiniciar");
const btnBuscar = document.getElementById("buttonBuscador");

// Contenedores
const contOponente = document.querySelector(".cartas-oponente");
const contMisCartas = document.querySelector(".mis-cartas");
const contPelicula = document.getElementById("Resultadopelicula");

// Mensajes
const verError = document.getElementById("verError");
const resultados = document.querySelector(".resultados");

const errorNombre = document.getElementById("errorNombre");
const errorEmail = document.getElementById("errorEmail");
const errorAsunto = document.getElementById("errorAsunto");
const errorMensaje = document.getElementById("errorMensaje");
const mensajeExito = document.getElementById("successMessage");

// Datos
let cartasOponente = [];
let misCartas = [];

// Inputs
const inputBuscador = document.getElementById("name-filter");
const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const asunto = document.getElementById("asunto");
const mensaje = document.getElementById("mensaje");

// Form
const form = document.getElementById("contactForm");

// Desplegar Navbar hamburguesa
abrirMenu.addEventListener("click", () => {
  nav.classList.add("visible");
});

// Cerrar Navbar hamburguesa
cerrarMenu.addEventListener("click", () => {
  nav.classList.remove("visible");
});

// Obtener datos
async function obtenerDatos() {
  try {
    const response = await fetch("https://ghibliapi.vercel.app/films");
    const data = await response.json();
    return data.sort(() => 0.5 - Math.random()).slice(0, 3);
  } catch (error) {
    console.log("Error al realizar la solicitud", error);
  }
}

// Calcular puntaje
function sumarPuntaje(pelicula) {
  return Number(pelicula.rt_score) + Number(pelicula.running_time);
}

// Crear carta
function crearCarta(pelicula, color) {
  const puntaje = sumarPuntaje(pelicula);

  return `
  <div class="api-card">
    <div class="card-inner">
      <div class="card-face card-face--front" style="background-image: url(${color})"></div>
      <div class="card-face card-face--back">
        <div class="card-content">
          <div class="card-header">
            <img src="${pelicula.movie_banner}" alt="Poster de ${pelicula.title}" />
          </div>
          <div class="card-body">
            <h3>${pelicula.title}</h3>
            <p><strong>Año:</strong> ${pelicula.release_date}</p>
            <p><strong>Director:</strong> ${pelicula.director}</p>
            <p><strong>Duración:</strong> ${pelicula.running_time} min</p>
            <p><strong>RT Score:</strong> ${pelicula.rt_score}</p>
            <div class="stats">
              <p>Puntos por RT Score: ${pelicula.rt_score}</p>
              <p>Puntos por Duración: ${pelicula.running_time}</p>
              <h4>Puntaje total: ${puntaje}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

// Generar cartas oponente
btnCartasOponente.addEventListener("click", async (e) => {
  e.preventDefault();
  contOponente.innerHTML = "";
  cartasOponente = await obtenerDatos();

  contOponente.innerHTML = cartasOponente
    .map((peli) => crearCarta(peli, "img/CardVioleta.png"))
    .join("");

  verError.innerHTML = "";
  btnCartasOponente.disabled = true;
});

// Generar mis cartas
btnMisCartas.addEventListener("click", async (e) => {
  e.preventDefault();
  contMisCartas.innerHTML = "";
  misCartas = await obtenerDatos();

  contMisCartas.innerHTML = misCartas
    .map((peli) => crearCarta(peli, "img/CardNaranja.png"))
    .join("");

  verError.innerHTML = "";
  btnMisCartas.disabled = true;
});

// Girar cartas
document.addEventListener("click", (e) => {
  const card = e.target.closest(".card-inner");
  if (card) card.classList.toggle("is-flipped");
});

// Ver resultado
btnVerResultado.addEventListener("click", (e) => {
  e.preventDefault();

  verError.innerHTML = "";

  if (cartasOponente.length === 0 && misCartas.length === 0) {
    verError.textContent =
      "Primero generá las cartas del oponente y las tuyas.";
    return;
  } else if (cartasOponente.length > 0 && misCartas.length === 0) {
    verError.textContent = "Todavía no generaste tus cartas.";
    return;
  } else if (cartasOponente.length === 0 && misCartas.length > 0) {
    verError.textContent = "Todavía no generaste las cartas del oponente.";
    return;
  }

  const totalOponente = cartasOponente.reduce(
    (acc, p) => acc + sumarPuntaje(p),
    0
  );
  const MiTotal = misCartas.reduce((acc, p) => acc + sumarPuntaje(p), 0);

  btnVerResultado.disabled = true;

  if (MiTotal > totalOponente) {
    resultados.innerHTML = `<h2>Resultado:</h2><p><strong>¡Ganaste!</strong> con ${MiTotal} vs ${totalOponente}</p>`;
  } else if (MiTotal < totalOponente) {
    resultados.innerHTML = `<h2>Resultado:</h2><p><strong>Perdiste</strong> con ${MiTotal} vs ${totalOponente} ¡Volvé a intentarlo!</p>`;
  } else {
    resultados.innerHTML = `<h2>Resultado:</h2><p><strong>¡Empate!</strong> Ambos suman ${MiTotal}</p>`;
  }
});

// Reiniciar
btnReiniciar.addEventListener("click", () => {
  cartasOponente = [];
  misCartas = [];

  contOponente.innerHTML = "";
  contMisCartas.innerHTML = "";
  resultados.innerHTML = "";
  verError.innerHTML = "";

  btnCartasOponente.disabled = false;
  btnMisCartas.disabled = false;
  btnVerResultado.disabled = false;
});

// Buscar película
btnBuscar.addEventListener("click", () => {
  const titulo = inputBuscador.value.trim();
  if (titulo) {
    obtenerPelicula(titulo);
  } else {
    mensajeBuscador();
  }
});

inputBuscador.addEventListener("keydown", (e) => {
  if (e.key === "Enter") btnBuscar.click();
});

async function obtenerPelicula(titulo) {
  try {
    const response = await fetch("https://ghibliapi.vercel.app/films");
    const data = await response.json();
    const resultado = data.filter((pelicula) =>
      pelicula.title.toLowerCase().includes(titulo.toLowerCase())
    );

    mostrarPeliculas(resultado);
  } catch (error) {
    console.log("Error:", error);
  }
}

function mostrarPeliculas(lista) {
  contPelicula.innerHTML = "";

  if (lista.length === 0) {
    contPelicula.innerHTML = "<p>No se encontró ninguna película.</p>";
    return;
  }

  lista.forEach((pelicula) => {
    contPelicula.innerHTML += `
      <div class="buscador-card">
           <div class="buscador-card-content">
              <div class="buscador-card-header">
                <img
                  src="${pelicula.image}"
                  alt="Poster de ${pelicula.title}"
                />
              </div>

              <div class="buscador-card-body">
                <h3>${pelicula.title}</h3>
                <p><strong>Título original:</strong> ${pelicula.original_title}</p>
                <p><strong>Año:</strong> ${pelicula.release_date}</p>
                <p><strong>Director:</strong> ${pelicula.director}</p>
                <p><strong>Duración:</strong> ${pelicula.running_time} min</p>
                <p><strong>Descripción:</strong></p>
                <p>${pelicula.description}</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    `;
  });
}

// Validación formularios
function validarNombre() {
  if (nombre.value.trim().length < 3) {
    errorNombre.innerHTML = `<p>El nombre debe tener al menos 3 caracteres.</p>`;
    errorNombre.style.display = "block";
    aplicarError(nombre);
    return false;
  }
  limpiarError(nombre, errorNombre);
  return true;
}

function validarEmail() {
  const valor = email.value.trim();
  if (!valor.includes("@") || valor.length < 5) {
    errorEmail.innerHTML = `<p>Ingresa un correo electrónico válido.</p>`;
    errorEmail.style.display = "block";
    aplicarError(email);
    return false;
  }
  limpiarError(email, errorEmail);
  return true;
}

function validarAsunto() {
  if (asunto.value === "") {
    errorAsunto.innerHTML = `<p>Seleccioná un asunto.</p>`;
    aplicarError(asunto);
    return false;
  }
  limpiarError(asunto, errorAsunto);
  return true;
}

function validarMensaje() {
  if (mensaje.value.trim() === "") {
    errorMensaje.textContent = "Escribí un mensaje.";
    aplicarError(mensaje);
    return false;
  }
  limpiarError(mensaje, errorMensaje);
  return true;
}

// Manejo de errores
function aplicarError(input) {
  input.classList.add("input-error");
  input.classList.remove("input-success");
}

function limpiarError(input, errorDiv) {
  errorDiv.textContent = "";
  input.classList.remove("input-error");
  input.classList.add("input-success");
}

// Validación en tiempo real
nombre.addEventListener("input", validarNombre);
email.addEventListener("input", validarEmail);
asunto.addEventListener("change", validarAsunto);
mensaje.addEventListener("input", validarMensaje);

// Validación al enviar el form
form.addEventListener("submit", function (e) {
  e.preventDefault(); // siempre prevenir el envío primero

  const valido =
    validarNombre() && validarEmail() && validarAsunto() && validarMensaje();

  if (!valido) return; //Si algo falla, NO se envía

  // Si todo está bien:
  mensajeExito.style.display = "block";
  form.reset();

  // Sacar bordes
  [nombre, email, asunto, mensaje].forEach((input) => {
    input.classList.remove("input-success");
  });
});
