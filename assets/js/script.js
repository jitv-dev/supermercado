const productos = [
  { nombre: "Aceite ", precio: 1500 },
  { nombre: "Azúcar 1kg", precio: 1000 },
  { nombre: "Bolsa de Basura", precio: 550 }
];

let carrito = [];

function renderizarProductos() {
  const contenedor = document.getElementById("lista-productos");
  contenedor.innerHTML = "";

  productos.forEach((producto, index) => {
    const card = document.createElement("div");
    card.className = "col";
    card.innerHTML = `<div class="card h-100 shadow-sm">
        <div class="card-body d-flex flex-column justify-content-between">
          <div>
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">Precio: $${producto.precio}</p>
          </div>
          <div class="d-flex align-items-center mb-2">
            <button class="btn btn-outline-secondary btn-sm" onclick="cambiarCantidad(${index}, -1)">-</button>
            <input type="number" id="cantidad-${index}" class="form-control mx-2 text-center" value="1" min="1" max="10" style="width: 60px;" />
            <button class="btn btn-outline-secondary btn-sm" onclick="cambiarCantidad(${index}, 1)">+</button>
          </div>
          <button class="btn btn-primary w-100" onclick="agregarAlCarrito(${index})">Agregar</button>
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

document.addEventListener("DOMContentLoaded", () => {
  renderizarProductos();
});
