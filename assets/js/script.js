const productos = [
    { nombre: "Aceite ", precio: 1500, imagen: "assets/img/aceite.webp" },
    { nombre: "Azúcar 1kg", precio: 1000, imagen: "assets/img/azucar.webp" },
    { nombre: "Bolsa de Basura", precio: 550, imagen: "assets/img/basura.webp" }
];

let nombreUsuario = prompt("Por favor ingrese su nombre")
document.getElementById("nombreUsuario").textContent = nombreUsuario
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
                        <p class="card-text">$${producto.precio.toLocaleString('es-AR')}</p>
                    </div>
                    <div class="d-flex align-items-center mb-2 justify-content-center">
                        <button class="btn btn-outline-secondary btn-sm " onclick="cambiarCantidad(${index}, -1)">-</button>
                        <input type="number" id="cantidad-${index}" class="form-ontrol mx-2 text-center" value="1" min="1" max="10" style="width: 60px;">
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

document.addEventListener("DOMContentLoaded", () => {
    renderizarProductos();
});

function agregarAlCarrito(index){
    const cantidad = parseInt(document.getElementById(`cantidad-${index}`).value)
    const contador = document.getElementById("contador-carrito")
    let total = parseInt(contador.textContent)

    total += cantidad
    contador.textContent = total
}