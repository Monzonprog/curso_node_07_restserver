const { Router } = require('express');
const {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch,
} = require('../controllers/usuarios');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

router.get('/', usuariosGet);

router.post(
    '/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('correo', 'El correo no es válido').isEmail(),
        check(
            'password',
            'El password debe de ser de más de 6 letras'
        ).isLength({ min: 6 }),
        check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        validarCampos,
    ],
    usuariosPost
);

router.put('/:id', usuariosPut);

router.delete('/', usuariosDelete);

router.patch('/', usuariosPatch);

module.exports = router;
