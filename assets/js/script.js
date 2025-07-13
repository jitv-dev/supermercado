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

  lista.innerHTML = "";
  let total = 0;
  let totalItems = 0;

  carrito.forEach((p, i) => {
    // Calcular el total y la cantidad de items
    total += p.precio * p.cantidad;
    totalItems += p.cantidad;

    // Crear un elemento de lista para cada producto en el carrito
    const item = document.createElement("li");
    item.className = "list-group-item d-flex justify-content-between align-items-center";
    item.innerHTML = `${p.nombre} x${p.cantidad} $${p.precio} c/u`;
    lista.appendChild(item);
  });

  contador.textContent = totalItems;
  totalSpan.textContent = total;
}
// para validar la cantidad del input aunque se ingrese manualmente un numero mayor (tambien hice algo en el css para que no se vean los botones de aumentar y disminuir)
function validarCantidadInput(index) {
  const input = document.getElementById(`cantidad-${index}`);
  let valor = parseInt(input.value);

  if (isNaN(valor) || valor < 1) {
    input.value = 1;
  } else if (valor > 10) {
    input.value = 10;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderizarProductos();
});
