const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { validationResult } = require('express-validator');

const usuariosGet = (req, res = response) => {
    const { q, nombre = 'No name', apikey, page = '1', limit } = req.query;

    res.json({
        msg: 'get API - controlador',
        q,
        apikey,
        nombre,
        page,
        limit,
    });
};

const usuariosPost = async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors})
    }

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    //Verificar si el correo existe
    const existEmail = await Usuario.findOne(({correo}));
    if(existEmail){
        return res.status(400).json({
            msg: "El correo ya está registrado"
        });
    }

    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt)

    //Guardar en BD
    await usuario.save();

    res.json({
        usuario,
    });
};

const usuariosPut = (req, res) => {
    const id = req.params.id;
    res.json({
        msg: 'put API - controlador',
        id,
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
    usuariosPatch,
};
