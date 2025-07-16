const productos = [
  { nombre: "Aceite ", precio: 1500, imagen: "assets/img/aceite.webp" },
  { nombre: "Azúcar 1kg", precio: 1000, imagen: "assets/img/azucar.webp" },
  { nombre: "Bolsa de Basura", precio: 550, imagen: "assets/img/basura.webp" },
];

let nombreUsuario = prompt("Por favor ingrese su nombre");
document.getElementById("nombreUsuario").textContent = nombreUsuario;
let carrito = [];

function renderizarProductos() {
  const contenedor = document.getElementById("lista-productos");
  contenedor.innerHTML = "";

  productos.forEach((producto, index) => {
    const card = document.createElement("div");
    card.className = "col mb-4";
    card.innerHTML = `
            <div class="card h-100 shadow-sm">
                <img src="${producto.imagen}" 
                    class="card-img-top p-3" 
                    alt="${producto.nombre}"
                    onerror="this.onerror=null;this.src='../img/default.webp';"
                    style="object-fit: contain; height: 200px;">
                
                <div class="card-body d-flex flex-column justify-content-between">
                    <div class="text-center">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">$${producto.precio}</p>
                    </div>
                    <div class="d-flex align-items-center mb-2 justify-content-center">
                        <button class="btn btn-outline-secondary btn-sm " onclick="cambiarCantidad(${index}, -1)">-</button>
                        <input type="number" id="cantidad-${index}" class="form-control mx-2 text-center" value="1" min="1" max="10" style="width: 60px;"
                        onchange="validarCantidadInput(${index})"
                        onblur="validarCantidadInput(${index})"
                        onkeyup="validarCantidadInput(${index})"/>
                        <button class="btn btn-outline-secondary btn-sm" onclick="cambiarCantidad(${index}, 1)">+</button>
                    </div>
                    <button class="btn btn-primary w-100" onclick="agregarAlCarrito(${index})">Agregar al carrito</button>
                </div>
            </div>`;
    contenedor.appendChild(card);
  });
}

function cambiarCantidad(index, cambio) {
  const input = document.getElementById(`cantidad-${index}`);
  let valor = parseInt(input.value);
  valor += cambio;

  if (valor < 1) valor = 1;
  if (valor > 10) valor = 10;

  input.value = valor;
}
// Función para agregar un producto al carrito
function agregarAlCarrito(index) {
  const inputCantidad = document.getElementById(`cantidad-${index}`);
  const cantidad = parseInt(inputCantidad.value);
  const producto = productos[index];
  const existente = carrito.find(p => p.nombre === producto.nombre);

  if (existente) {
    existente.cantidad += cantidad;
  } else {
    carrito.push({ ...producto, cantidad });
  }

  actualizarCarrito();
}
// Función para actualizar el carrito 
function actualizarCarrito() {
  const lista = document.getElementById("lista-carrito");
  const contador = document.getElementById("contador-carrito");
  const totalSpan = document.getElementById("total-carrito");
  const precioEnvio = document.getElementById("precio-envio");
  const totalMasEnvio = document.getElementById("final-envio");
  const carritoVacio = document.getElementById("carrito-vacio")
  const carritoContenido = document.getElementById("carrito-contenido");


  lista.innerHTML = "";
  let total = 0;
  let totalItems = 0;
  let precioEnvioBase = 3000;


  if (carrito.length > 0) {
    carritoVacio.style.display = "none";
    carritoContenido.style.display = "block";
  } else {
    carritoVacio.style.display = "block";
    carritoContenido.style.display = "none";
  }

  carrito.forEach((p, i) => {

    total += p.precio * p.cantidad;
    totalItems += p.cantidad;


    const card = document.createElement("div");
    card.className = "card mb-3";
    card.innerHTML = `
      <div class="card-body p-3">
    <div class="row align-items-center">
      <div class="col-md-6 d-flex align-items-center gap-3">
        <img src="${p.imagen}" 
            class="rounded" 
            width="60" 
            height="60"
            style="object-fit: cover"
            alt="${p.nombre}">
        <div>
          <h6 class="card-title mb-1 fw-semibold">${p.nombre}</h6>
          <small class="text-muted">$${p.precio} c/u</small>
        </div>
      </div>
      <div class="d-flex align-items-center">
  <button class="btn btn-outline-secondary btn-sm" onclick="cambiarCantidadEnCarrito(${i}, -1)">-</button>
  <input
    type="number"
    id="cantidad-carrito-${i}"
    class="form-control mx-2 text-center"
    value="${p.cantidad}"
    min="1"
    max="10"
    style="width: 60px;"
    onchange="validarCantidadCarrito(${i})"
    onblur="validarCantidadCarrito(${i})"
    onkeyup="validarCantidadCarrito(${i})"
  />
  <button class="btn btn-outline-secondary btn-sm" onclick="cambiarCantidadEnCarrito(${i}, 1)">+</button>
</div>

        <span class="fw-bold fs-5">$${(p.precio * p.cantidad)}</span>
        <button class="btn btn-danger btn-sm" onclick="eliminarDelCarrito(${i})">
              <i class="bi bi-trash"></i>
        </button>
      </div>
    </div>
  </div>
    `;

    lista.appendChild(card);
  });

  if (total > 30000) {
    precioEnvioBase = 0
  }

  precioEnvio.textContent = `$${precioEnvioBase}`
  totalMasEnvio.textContent = totalMasEnvio.textContent = `$${(total + precioEnvioBase).toFixed(0)}`;

  contador.textContent = totalItems;
  totalSpan.textContent = `$${total.toFixed(0)}`;
}
// para validar la cantidad del input aunque se ingrese manualmente un numero mayor 
function validarCantidadInput(index) {
  const input = document.getElementById(`cantidad-${index}`);
  let valor = parseInt(input.value);

  if (isNaN(valor) || valor < 1) {
    input.value = 1;
  } else if (valor > 10) {
    input.value = 10;
  }
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}
function cambiarCantidadEnCarrito(index, cambio) {
  let producto = carrito[index];
  producto.cantidad += cambio;

  if (producto.cantidad < 1) producto.cantidad = 1;
  if (producto.cantidad > 10) producto.cantidad = 10;

  actualizarCarrito();
}

function validarCantidadCarrito(index) {
  const input = document.getElementById(`cantidad-carrito-${index}`);
  let valor = parseInt(input.value);

  if (isNaN(valor) || valor < 1) {
    carrito[index].cantidad = 1;
  } else if (valor > 10) {
    carrito[index].cantidad = 10;
  } else {
    carrito[index].cantidad = valor;
  }

  actualizarCarrito();
}
function finalizarCompra() {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío. Agrega productos antes de finalizar.");
    return;
  }

  let total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
  let envio = total > 30000 ? 0 : 3000;
  let totalFinal = total + envio;

  const confirmacion = confirm(`Gracias por tu compra, ${nombreUsuario}.\n\nResumen:\nTotal productos: $${total}\nEnvío: $${envio}\n-----------------------\nTotal a pagar: $${totalFinal}\n\n¿Deseas confirmar tu compra?`);

  if (confirmacion) {
    alert("¡Compra realizada con éxito! Pronto recibirás tu pedido.");
    carrito = [];
    actualizarCarrito();
  }
}
document.addEventListener("DOMContentLoaded", () => {
  renderizarProductos();
});
