const { Router } = require("express");

const {
  UsuariosGet,
  UsuariosPost,
  UsuariosPut,
  UsuariosDelete,
} = require("../controllers/user.controller");

const router = new Router();

router.get("/", UsuariosGet);

router.post("/", UsuariosPost);

router.put("/:id", UsuariosPut);

router.delete("/", UsuariosDelete);

module.exports = router;
