const {response} = require('express');

const UsuariosGet = (req, res = response) =>{
    const {q, edad, pagina = '1'} = req.query;
    if(!edad){
        res.json({
            mensaje: "falta edad"
        });
    }
    res.json({
        msg: 'get API - Controller',
        q,
        edad,
        pagina
    });
}
const UsuariosPost = (req, res = response) =>{
    const body = req.body;
    
    res.json({
        msg: 'post API - Controller',
        body
    });
}
const UsuariosPut = (req, res = response) =>{
    const id = req.params.id;

    res.json({
        msg: 'put API - Controller',
        id: id
    });
}
const UsuariosDelete = (req, res = response) =>{
    res.json({
        msg: 'delete API - Controller'
    });
}



module.exports = {
    UsuariosGet,
    UsuariosPost,
    UsuariosPut,
    UsuariosDelete
}