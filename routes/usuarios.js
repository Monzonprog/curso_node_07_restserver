const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
} = require('../helpers/db-validatos');
const {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch,
} = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet);

router.post(
    '/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check(
            'password',
            'El password debe de ser de más de 6 letras'
        ).isLength({ min: 6 }),
        check('correo').custom(emailExiste),
        check('rol').custom(esRoleValido),
        validarCampos,
    ],
    usuariosPost
);

router.put(
    '/:id',
    [
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        check('rol').custom(esRoleValido),
        validarCampos,
    ],
    usuariosPut
);

router.delete(
    '/:id',
    [
        validarJWT,
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        validarCampos,
    ],
    usuariosDelete
);

router.patch('/', usuariosPatch);

module.exports = router;
