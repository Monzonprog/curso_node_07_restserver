const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const {
    existeProductoPorId,
    existeCategoriaPorId,
} = require('../helpers/db-validator');
const {
    obtenerProductos,
    obtenerProducto,
    borrarProducto,
    crearProducto,
    actualizarProducto,
} = require('../controllers/productos');

const router = Router();

//Obtener todas los producto - publico
router.get('/', obtenerProductos);

//Obtener todas los producto por id - publico
router.get(
    '/:id',
    [
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom(existeProductoPorId),
        validarCampos,
    ],
    obtenerProducto
);

//Crear producto - privado - cualquier persona con token válido
router.post(
    '/',
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('categoria', 'No es un ID valido').isMongoId(),
        check('categoria').custom(existeCategoriaPorId),
        validarCampos,
    ],
    crearProducto
);

//Actualizar producto - privado - cualquier persona con token válido
router.put(
    '/:id',
    [validarJWT, 
    check('id').custom(existeProductoPorId), 
    validarCampos],
    actualizarProducto
);

//Borrar producto - privado - Admin
router.delete(
    '/:id',
    [
        validarJWT,
        esAdminRole,
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom(existeProductoPorId),
        validarCampos,
    ],
    borrarProducto
);

module.exports = router;
