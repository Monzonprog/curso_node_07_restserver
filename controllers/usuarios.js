const { response, request } = require('express');
const Usuario = require('../models/usuario')

const usuariosGet = (req, res = response) => {

    const {q, nombre = 'No name', apikey, page = "1", limit} = req.query;

    res.json({
        msg: 'get API - controlador',
        q,apikey, nombre, page, limit
    });
};

const usuariosPost = async(req, res) => {

    const body = req.body;
    const usuario = new Usuario(body);

    await usuario.save();

    res.json({
        usuario
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
