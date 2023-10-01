const { response, request } = require('express');
const Usuario = require('../models/usuario');

const esAdminRole = async (req, res = response, next) => {
    if (!req.usuario) {
        return res.status(500).json({
            msg: 'No se ha validado el token',
        });
    }
    const { rol, nombre } = req.usuario;

    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${nombre} no es admistrador`,
        });
    }

    next();
};

const tieneRole = (...roles) => {
    return (req, res = response, next) => {
        if (!req.usuario) {
            return res.status(500).json({
                msg: 'No se ha validado el token',
            });
        }

        if (!roles.includes(req.usuario.rol)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${roles}`,
            });
        }
        next();
    };
};

module.exports = {
    esAdminRole,
    tieneRole,
};
