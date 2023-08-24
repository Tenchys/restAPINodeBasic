const {response} = require('express');
const bcryptjs = require('bcryptjs');


const Usuario = require('../models/usuario');
const usuario = require('../models/usuario');

const UsuariosGet = async (req, res = response) =>{
    const { limite = 5, desde = 0} = req.query;
    const query = {estado: true};



    const [total, usuarios] = await Promise.all([Usuario.countDocuments(query), 
        Usuario.find(query)
        .limit(limite)
        .skip(desde)]);
    res.json({
        Total: total,
        usuarios: usuarios
    });
}
const UsuariosPost = async (req, res = response) =>{
    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});
    // encriptar pass
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);
    // guardar en BD
    await usuario.save();
    
    res.json({
        msg: 'post API - Controller',
        usuario
    });
}
const UsuariosPut = async (req, res = response) =>{
    const {id} = req.params;
    const {_id,password, google, correo, ...resto} = req.body;

    //TODO Validar contra base de datos
    if(password){
        //Encriptar la pass
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id,resto);

    res.json({
        msg: 'put API - Controller',
        usuario
    });
}
const UsuariosDelete = async (req, res = response) =>{
    const {id} = req.params;

    // const usuario = await Usuario.findbyIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});



    res.json({
        usuario
    });
}



module.exports = {
    UsuariosGet,
    UsuariosPost,
    UsuariosPut,
    UsuariosDelete
}