const Role = require('../models/role');
const Usuario = require('../models/usuario');




const esRolValido = async (rol = '') => {
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
      throw new Error(`El rol ingresado ${rol} no existe`);
    }
}


const esMailExiste = async (correo = '') => {
  const ExisteCorreo = await Usuario.findOne({correo});
  if(ExisteCorreo){
    throw new Error(`El mail ingresado ya existe en la base de datos`);
  }
}

const existeUsuarioPorId = async (id) => {
  const existeUsuario = await Usuario.findById(id);
  if(!existeUsuario){
    throw new Error(`El Id ingresado no existe en la base`);
  }
}



module.exports = { 
    esRolValido,
    esMailExiste,
    existeUsuarioPorId
}