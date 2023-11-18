const Role = require('../models/role');
const { Usuario, Categoria, Producto } = require('../models');

/* USUARIOS */
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

/* CATEGORIAS */
const existeCategoriaPorId = async (id) => {
    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) {
        throw new Error(`No existe categoria con id: ${id}`);
    }
};

/* PRODUCTOS */
const existeProductoPorId = async (id) => {
    const existeProducto = await Producto.findById(id);
    if (!existeProducto) {
        throw new Error(`No existe producto con id: ${id}`);
    }
};

module.exports = {
    emailExiste,
    esRoleValido,
    existeCategoriaPorId,
    existeProductoPorId,
    existeUsuarioPorId,
};

