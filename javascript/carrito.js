let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let total = 0;

document.addEventListener("DOMContentLoaded", function() {
    actualizarCarrito();
    const comprarButton = document.getElementById('comprar');
    if (comprarButton) {
        comprarButton.addEventListener('click', comprar);
    }
});

function añadirAlCarrito(producto, precio) {
    carrito.push({producto, precio});
    actualizarCarrito();
    guardarCarrito();
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
    guardarCarrito();
}

function actualizarCarrito() {
    const listaCarrito = document.getElementById('listaCarrito');
    const totalElem = document.getElementById('total');
    const carritoContador = document.getElementById('carritoContador');

    if (listaCarrito) {
        listaCarrito.innerHTML = '';
        carrito.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = `${item.producto} - $${item.precio}`;
            
            const botonEliminar = document.createElement('button');
            botonEliminar.textContent = 'Eliminar';
            botonEliminar.classList.add('eliminar');
            botonEliminar.onclick = () => eliminarDelCarrito(index);
            
            li.appendChild(botonEliminar);
            listaCarrito.appendChild(li);
        });

        total = carrito.reduce((acc, item) => acc + item.precio, 0);
        totalElem.textContent = total;
    }

    if (carritoContador) {
        carritoContador.textContent = carrito.length;
    }
}

function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function comprar() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío. Añade productos antes de comprar.");
        return;
    }

    alert("Compra realizada con éxito.");

    carrito = [];
    guardarCarrito();
    actualizarCarrito();
}
