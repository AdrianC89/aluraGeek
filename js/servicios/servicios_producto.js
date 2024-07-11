const apiUrl = "http://localhost:3000/productos";



const listaProducto = async () => {
    try {
        const res = await fetch(apiUrl);
        return await res.json();
    } catch (er) {
        return console.log(er);
    }
};

const crearProducto = async (nombre, precio, imagen) => {
    try {
        const res = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, precio, imagen }),
        });
        return await res.json();
    } catch (er) {
        return console.log(er);
    }
};

const eliminarProducto = async (id) => {
    try {
        const res = await fetch(`${apiUrl}/${id}`, {
            method: "DELETE"
        });
        return await res.json();
    } catch (err) {
        return console.log(err);
    }
};

export const serviciosProductos = {
    listaProducto,
    crearProducto,
    eliminarProducto
};
