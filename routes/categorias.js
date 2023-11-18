const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const { existeCategoriaPorId } = require('../helpers/db-validator');
const {
    crearCategoria,
    obtenerCategorias,
    borrarCategoria,
    obtenerCategoria,
    actualizarCategoria,
} = require('../controllers/categorias');

const router = Router();

//Obtener todas las categorias - publico
router.get('/', obtenerCategorias);

//Obtener todas las categorias por id - publico
router.get(
    '/:id',
    [
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom(existeCategoriaPorId),
        validarCampos
    ],
    obtenerCategoria
);

//Crear categorias - privado - cualquier persona con token válido
router.post(
    '/',
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    crearCategoria
);

//Actualizar categorias - privado - cualquier persona con token válido
router.put(
    '/:id',
    [
        validarJWT,
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom(existeCategoriaPorId),
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarCategoria
);

//Borrar categoria - privado - Admin
router.delete(
    '/:id',
    [
        validarJWT,
        esAdminRole,
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom(existeCategoriaPorId),
        validarCampos,
    ],
    borrarCategoria
);

module.exports = router;
