const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); 
app.use(express.json());

let productos = [];

// Ruta para listar productos
app.get('/productos', (req, res) => {
    res.json(productos);
});

// Ruta para crear producto
app.post('/productos', (req, res) => {
    const producto = req.body;
    produtos.push(producto);
    res.status(201).json(producto);
});

// Ruta para eliminar producto
app.delete('/productos/:id', (req, res) => {
    const { id } = req.params;
    productos = productos.filter(prod => prod.id !== id);
    res.status(200).json({ message: 'Producto eliminado' });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rcorriendo en el puerto ${PORT}`);
});
