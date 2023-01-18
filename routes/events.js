const { Router } = require("express");
const { validarJWT } = require('../middlewares/validarJWT');
const { getEvento, crearEvento, actualizarEvento, eliminarEvento } = require("../controller/events");
const { check } = require("express-validator");
const {isDate} = require("../helpers/isDate");
const { validarCampos } = require("../middlewares/validarCampos");
const router = Router();
/**
 * [API Documentation]
 * /api/events
 */
//Todo los eventos estan protegidos por JWT
router.use(validarJWT)

//Obtener eventos
router.get('/', getEvento)

//Crear un nuevo evento
router.post('/', 
            [
                check("title", "El titulo es obligatorio").not().isEmpty(),
                check("start", "Fecha de inicio es obligatorio").custom(isDate),
                validarCampos
            ], crearEvento)

//Actualizar un evento
router.put('/:id', actualizarEvento)

//Borrar un evento
router.delete('/:id', eliminarEvento)

module.exports = router