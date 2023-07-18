import { agregarAlCarrito, eliminarDelCarrito } from './productos.js'

const arrayDeProductos = [];
let arrayCarrito = JSON.parse(localStorage.getItem("carrito")) || [];

async function inicializarProductos() {
    const response = await fetch("./js/listaproductos.json");
    const productosJson = await response.json();
    productosJson.forEach((prod) => {
        arrayDeProductos.push(prod);
        const card = document.createElement("div");
        card.classList.add("col");
        card.classList.add("mb-5");
        let cardItem = "";
        if (!prod.promo) {
            cardItem = `
                <div class="card h-100">
                    <!-- Product image-->
                    <img class="card-img-top" src="${prod.img}" alt="..." />
                    <!-- Product details-->
                    <div class="card-body p-4">
                        <div class="text-center">
                            <!-- Product name-->
                            <h5 class="fw-bolder">${prod.nombre}</h5>
                            <!-- Product price-->
                            $${prod.precio}
                        </div>
                    </div>
                    <!-- Product actions-->
                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent text-center">
                    <button id="button-${prod.id}" type="button" class="btn btn-outline-dark mt-auto">
                        Agregar al carrito
                    </button>
                    </div>
                </div>
            `;
        } else if (prod.promo && prod.recomendado) {
            cardItem = `
            <div class="card h-100">
                <!-- Sale badge-->
                <div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">Promo
                </div>
                <!-- Product image-->
                <img class="card-img-top" src="${prod.img}" alt="..." />
                <!-- Product details-->
                <div class="card-body p-4">
                    <div class="text-center">
                        <!-- Product name-->
                        <h5 class="fw-bolder">${prod.nombre}</h5>
                        <!-- Product reviews-->
                        <div class="d-flex justify-content-center small text-warning mb-2">
                            <div class="bi-star-fill"></div>
                            <div class="bi-star-fill"></div>
                            <div class="bi-star-fill"></div>
                            <div class="bi-star-fill"></div>
                            <div class="bi-star-fill"></div>
                        </div>
                        <!-- Product price-->
                        <span class="text-muted text-decoration-line-through">$${prod.precio}</span>
                        $${prod.precioPromo}
                    </div>
                </div>
                <!-- Product actions-->
                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent text-center">
                <button id="button-${prod.id}" type="button" class="btn btn-outline-dark mt-auto">
                     Agregar al carrito
                </button>
                </div>
            </div>
        `
        } else if (prod.promo && !prod.recomendado) {
            cardItem = `
            <div class="card h-100">
                <!-- Sale badge-->
                <div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">Promo
                </div>
                <!-- Product image-->
                <img class="card-img-top" src="${prod.img}" alt="..." />
                <!-- Product details-->
                <div class="card-body p-4">
                    <div class="text-center">
                        <!-- Product name-->
                        <h5 class="fw-bolder">${prod.nombre}</h5>
                        <!-- Product price-->
                        <span class="text-muted text-decoration-line-through">$${prod.precio}</span>
                        $${prod.precioPromo}
                    </div>
                </div>
                <!-- Product actions-->
                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent text-center">
                    <button id="button-${prod.id}" type="button" class="btn btn-outline-dark mt-auto">
                            Agregar al carrito
                    </button>
                </div>
            </div>
        `
        }

        card.innerHTML = cardItem;
        productos.appendChild(card);

        const buttonAgregar = document.querySelector("#button-" + prod.id);

        buttonAgregar.addEventListener("click", () => {
            agregarAlCarrito(arrayCarrito, prod);
            localStorage.setItem("carrito", JSON.stringify(arrayCarrito));
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Se agrego al carrito el producto ' + prod.nombre,
                showConfirmButton: true,
                confirmButtonText: 'Ok',
                timer: 3000
            })
            arrayCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
            countItemsCarrito.innerText = arrayCarrito.length;
        })

    })
}

inicializarProductos();

const productos = document.querySelector("#productos");
const countItemsCarrito = document.querySelector("#countItemsCarrito");
countItemsCarrito.innerText = arrayCarrito.length;
const carritoButton = document.querySelector("#carritoButton");
const paymentButton = document.querySelector("#paymentButton");

carritoButton.addEventListener("click", () => {
    recalcularCarrito();
    countItemsCarrito.innerText = arrayCarrito.length;
    if (arrayCarrito.length == 0) {
        const listaCarrito = document.querySelector("#listaCarrito");
        listaCarrito.innerHTML = ` <div class="text-center lead fw-normal text-black-50 mb-0">
        ¡Tu carrito esta vacío!
        <div class="slide-header">
         <i class="bi bi-cart-x-fill img-cart-empty"></i>
        </div>`;
    }
})

function recalcularCarrito() {
    const listaCarrito = document.querySelector("#listaCarrito");
    const cantArt = document.querySelector("#cantArt");
    const subtotal = document.querySelector("#subtotal");
    const ivaPago = document.querySelector("#iva");
    const total = document.querySelector("#total");

    listaCarrito.innerHTML = '';
    arrayCarrito.forEach((prod) => {
        let card = document.createElement("div");
        let cardItem = "";
        if (!prod.promo) {
            cardItem = `
                <div class="card h-100">
                    <!-- Product image-->
                    <img class="card-img-top" src="${prod.img}" alt="..." />
                    <!-- Product details-->
                    <div class="card-body p-4">
                        <div class="text-center">
                            <!-- Product name-->
                            <h5 class="fw-bolder">${prod.nombre}</h5>
                            <!-- Product price-->
                            $${prod.precio}
                        </div>
                    </div>
                    <!-- Product actions-->
                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent text-center">
                    <button id="buttonModal-${prod.id}" type="button" class="btn btn-outline-dark mt-auto">
                        Eliminar del carrito
                    </button>
                    </div>
                </div>
            `;
        } else if (prod.promo && prod.recomendado) {
            cardItem = `
            <div class="card h-100">
                <!-- Sale badge-->
                <div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">Promo
                </div>
                <!-- Product image-->
                <img class="card-img-top" src="${prod.img}" alt="..." />
                <!-- Product details-->
                <div class="card-body p-4">
                    <div class="text-center">
                        <!-- Product name-->
                        <h5 class="fw-bolder">${prod.nombre}</h5>
                        <!-- Product reviews-->
                        <div class="d-flex justify-content-center small text-warning mb-2">
                            <div class="bi-star-fill"></div>
                            <div class="bi-star-fill"></div>
                            <div class="bi-star-fill"></div>
                            <div class="bi-star-fill"></div>
                            <div class="bi-star-fill"></div>
                        </div>
                        <!-- Product price-->
                        <span class="text-muted text-decoration-line-through">$${prod.precio}</span>
                        $${prod.precioPromo}
                    </div>
                </div>
                <!-- Product actions-->
                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent text-center">
                <button id="buttonModal-${prod.id}" type="button" class="btn btn-outline-dark mt-auto">
                    Eliminar del carrito
                </button>
                </div>
            </div>
        `
        } else if (prod.promo && !prod.recomendado) {
            cardItem = `
            <div class="card h-100">
                <!-- Sale badge-->
                <div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">Promo
                </div>
                <!-- Product image-->
                <img class="card-img-top" src="${prod.img}" alt="..." />
                <!-- Product details-->
                <div class="card-body p-4">
                    <div class="text-center">
                        <!-- Product name-->
                        <h5 class="fw-bolder">${prod.nombre}</h5>
                        <!-- Product price-->
                        <span class="text-muted text-decoration-line-through">$${prod.precio}</span>
                        $${prod.precioPromo}
                    </div>
                </div>
                <!-- Product actions-->
                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent text-center">
                    <button id="buttonModal-${prod.id}" type="button" class="btn btn-outline-dark mt-auto">
                        Eliminar del carrito
                    </button>
                </div>
            </div>
        `
        }

        card.innerHTML = cardItem;
        listaCarrito.appendChild(card);

        const buttonEliminar = document.querySelector("#buttonModal-" + prod.id);

        buttonEliminar.addEventListener("click", () => {
            Swal.fire({
                title: 'Estas seguro?',
                text: "Se eliminara este producto del carrito!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminar!'
            }).then((result) => {
                if (result.isConfirmed) {
                    eliminarDelCarrito(arrayCarrito, prod);
                    arrayCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
                    countItemsCarrito.innerText = arrayCarrito.length;
                    recalcularCarrito();
                    Swal.fire(
                        'Eliminado!',
                        'El producto ha sido eliminado.',
                        'success'
                    )
                }
            })
        })

    });

    let monto = parseFloat((arrayCarrito.reduce((acumulador, prod) => acumulador + prod.precio, 0)).toFixed(3));
    let procentajeIva = 18;
    let iva = parseFloat(((monto * procentajeIva) / 100).toFixed(3));
    let valorTotal = (monto + iva).toFixed(3);

    cantArt.value = arrayCarrito.length;
    subtotal.value = monto;
    ivaPago.value = iva;
    total.value = valorTotal;

    if (arrayCarrito.length == 0) {
        listaCarrito.innerHTML = ` <div class="text-center lead fw-normal text-black-50 mb-0">
                                    ¡Tu carrito esta vacío!
                                    <div class="slide-header">
                                         <i class="bi bi-cart-x-fill img-cart-empty"></i>
                                    </div>`;
    }

}


paymentButton.addEventListener("click", () => {

    Swal.fire({
        title: 'Estas seguro?',
        text: "Realizaras el pago de los productos del carrito!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, pagar!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Pago Exitoso!',
                'Muchas gracias por tu compra, tu pago ha sido exitoso con N° de pedido 24234.',
                'success'
            )
            localStorage.removeItem("carrito");
            setTimeout(function () {
                location.reload()
            }, 3000);
        }
    })
})