const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la BD`);
    }
};

const emailExiste = async (correo = '') => {
    const existEmail = await Usuario.findOne({ correo });
    if (existEmail) {
        throw new Error(`El correo: ${correo} ya está registrado`);
    }
};

const existeUsuarioPorId = async (id) => {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`No existe usuario con id: ${id}`);
    }
};

module.exports = { esRoleValido, emailExiste, existeUsuarioPorId };
