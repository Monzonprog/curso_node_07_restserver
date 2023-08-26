const { response, request } = require('express');

const usuariosGet = (req, res = response) => {

    const {q, nombre = 'No name', apikey, page = "1", limit} = req.query;

    res.json({
        msg: 'get API - controlador',
        q,apikey, nombre, page, limit
    });
};

const usuariosPost = (req, res) => {

    const {nombre, edad} = req.body;
    res.json({
        msg: 'post API - controlador',
        nombre,
        edad
    });
};

const usuariosPut = (req, res) => {

    const id = req.params.id
    res.json({
        msg: 'put API - controlador',
        id
    });
};
const usuariosDelete = (req, res) => {
    res.json({
        msg: 'delete API - controlador',
    });
};

const usuariosPatch = (req, res) => {
    res.json({
        msg: 'patch API - controlador',
    });
};

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
};
