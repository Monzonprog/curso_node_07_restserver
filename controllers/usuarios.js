const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

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

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt)

    //Guardar en BD
    await usuario.save();

    res.json({
        usuario,
    });
};

const usuariosPut = async(req, res) => {
    const {id} = req.params;
    const {password, google, correo, ...resto} = req.body

    //TODO validar contra BD
    if(password){
        //Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto)


    
    res.json({
        msg: 'put API - controlador',
        usuario,
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
