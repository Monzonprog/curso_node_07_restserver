const { response } = require('express');
const { Producto } = require('../models');

const crearProducto = async (req, res = response) => {
    console.log(req.body)
    const {estado, usuario, nombre,...body} = req.body;

    const productoDB = await Producto.findOne({ nombre });

    if (productoDB) {
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre} ya existe`,
        });
    }

    const data = {
        nombre: nombre.toUpperCase(),
        categoria: body.categoria,
        usuario: req.usuario._id,
    };

    const producto = new Producto(data);

    await producto.save();

    res.status(201).json(producto);
};

//obtenerproductos - paginado - total - populate
const obtenerProductos = async (req, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };
    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
            .limit(Number(limite))
            .skip(Number(desde)),
    ]);
    res.json({
        total,
        productos,
    });
};

//obtenerProducto - populate
const obtenerProducto = async (req, res = response) => {
    const { id } = req.params;
    const producto = await Producto.findById(id)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre');

    res.json({
        producto,
    });
};

//actualizarProducto
const actualizarProducto = async (req, res) => {
    const { id } = req.params;
    const { estado, usuario,nombre, ...data } = req.body;
    data.nombre = nombre.toUpperCase();
    data.usuario = req.usuario._id;
    const producto = await Producto.findByIdAndUpdate(id, data, {
        new: true,
    });

    res.json({
        producto,
    });
};

//borrarProducto
const borrarProducto = async (req, res) => {
    const { id } = req.params;
    const producto = await Producto.findByIdAndUpdate(
        id,
        { estado: false },
        { new: true }
    );

    res.json({
        producto,
    });
};

module.exports = {
    crearProducto,
    obtenerProductos,
    borrarProducto,
    actualizarProducto,
    obtenerProducto,
};
