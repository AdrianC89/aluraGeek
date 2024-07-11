import { serviciosProductos } from "../servicios/servicios_producto.js";

const productoMenu = document.querySelector("[data-producto]");
const form = document.querySelector("[data-form]");

function crearCard(nombre, precio, imagen, id) {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
    <div class="imag_container">
        <img class="card_img" src="${imagen}"  alt="${nombre}">
    </div>
    <div class="Img_info">
        <p>${nombre}</p>
        <div class="card_valor">
            <p>R$${precio}</p>
            <button class="boton_delete" data-id="${id}">
                <img src="img/lixeira.png" alt="lixeira">
            </button>
        </div>
    </div>
    `;

    const cardEliminar = card.querySelector(".boton_delete");
    cardEliminar.addEventListener("click", () => {
        serviciosProductos.eliminarProducto(id)
            .then(() => {
                card.remove();
            })
            .catch(er => console.log(er));
    });

    productoMenu.appendChild(card);
    return card;
}

const listaRender = async () => {
    try {
        const listaProducto = await serviciosProductos.listaProducto();

        listaProducto.forEach((producto) => {
            productoMenu.appendChild(
                crearCard(producto.nombre, producto.precio, producto.imagen, producto.id)
            );
        });

    } catch (error) {
        console.log(error);
    }
};

form.addEventListener("submit", (event) => {
    event.preventDefault();

    console.log("Formulario enviado!");

    const nombre = document.querySelector("[data-nombre]").value;
    const precio = document.querySelector("[data-precio]").value;
    const imagen = document.querySelector("[data-imagen]").value;

    serviciosProductos
        .crearProducto(nombre, precio, imagen)
        .then((res) => {
            console.log(res);
            productoMenu.appendChild(crearCard(nombre, precio, imagen, res.id));
        })
        .catch((er) => console.log(er));
});

form.addEventListener("reset", (event) => {
    event.preventDefault();

    document.querySelector("[data-nombre]").value = "";
    document.querySelector("[data-precio]").value = "";
    document.querySelector("[data-imagen]").value = "";

    return;
});

listaRender();
