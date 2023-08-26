const { response } = require('express');

const usuariosGet = (req, res = response) => {
    res.json({
        msg: 'get API - controlador',
    });
};

const usuariosPost = (req, res) => {
    res.json({
        msg: 'post API - controlador',
    });
};

const usuariosPut = (req, res) => {
    res.json({
        msg: 'put API - controlador',
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
