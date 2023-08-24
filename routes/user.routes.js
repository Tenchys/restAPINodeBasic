const { Router } = require("express");
const {check} = require('express-validator');

const {
  UsuariosGet,
  UsuariosPost,
  UsuariosPut,
  UsuariosDelete,
} = require("../controllers/user.controller");
const { validarCampos } = require("../middleware/validar-campos");
const {esRolValido, esMailExiste, existeUsuarioPorId} = require('../helpers/db-validators')


const router = new Router();

router.get("/", UsuariosGet);

router.post("/", [
  check('correo', 'el correo no es valido').isEmail(),
  check('correo').custom(esMailExiste),
  check('nombre', 'nombre es obligatorio').not().isEmpty(),
  check('password','La contraseña debe ser mas de 6 letras').isLength({min: 6}),
  //check('rol','No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
  check('rol').custom(esRolValido),
  validarCampos
],UsuariosPost);

router.put("/:id",[
  check('id',`No es un ID valido`).isMongoId(),
  check('id').custom(existeUsuarioPorId),
  check('rol').custom(esRolValido),
  validarCampos
],UsuariosPut);

router.delete("/:id",[
  check('id',`No es un ID valido`).isMongoId(),
  check('id').custom(existeUsuarioPorId),
  validarCampos
],UsuariosDelete);

module.exports = router;
