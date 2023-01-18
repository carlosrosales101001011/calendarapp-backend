const { Router } = require('express');
const {check} = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controller/auth');
const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarJWT');
const router = Router();
/**
 * [API Documentation]
 * /api/auth/
 */

router.post('/register', 
            [
                check('name', 'El nombre es obligatorio').not().isEmpty(),
                check('email', 'El email es obligatorio').isEmail(),
                check('password', 'El password debe de ser de 6 caracteres').isLength({min: 6}),
                validarCampos
            ], 
            crearUsuario)
router.post('/',
            [
                check('email', 'Por favor rellenar el campo email').isEmail(),
                check('password', 'El password debe de ser de 6 caracteres').isLength({min: 6}),
                validarCampos
            ], 
            loginUsuario)
router.get('/renew', validarJWT, revalidarToken)

module.exports = router;