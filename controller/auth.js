const { response, request } = require("express")
const  { validationResult } = require('express-validator');
const Usuario = require("../models/Usuario");
const bcrypt = require('bcryptjs');
const generarJWT = require("../helpers/jwt");
const crearUsuario = async(req=request, res=response)=>{

    const {name, email, password} = req.body
        try{
            let usuario = await Usuario.findOne({email})
            if (usuario) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Un usuario existe con el mismo correo'

                })
            }


            usuario = new Usuario(req.body)
            

            //Encriptar constraseña
            const salt = bcrypt.genSaltSync()
            usuario.password= bcrypt.hashSync(password, salt)

            await usuario.save()

            //Generar jwt para el usuario 
            const token = await generarJWT(usuario.id, usuario.name)

            res.status(201).json({
                ok: true,
                uid: usuario.id,
                name: usuario.name,
                token
            })
        }
        catch(err) {
            console.log(err);
            res.status(500).json({
                ok: false,
                msg: "Error al registrarte"
            })
        }


}

const loginUsuario = async(req=request, res=response)=>{

    const { email, password } = req.body
    

    try{
        let usuario = await Usuario.findOne({email})
    if (!usuario) {
        return res.status(400).json({
            ok: false,
            msg: 'El usuario no existe'

        })
    }
    const validPassword = bcrypt.compareSync(password, usuario.password)

    if (!validPassword) {
        return res.status(400).json({
            ok: false,
            msg: 'Password incorrect'
        })
    }

    //Generate JWT token
            const token = await generarJWT(usuario.id, usuario.name)

    res.json({
    ok: true,
    uid: usuario.id,
    name: usuario.name,
    token
    })

    }
    catch(err) {
        console.log(err, "Aca esta el Error");
        res.status(500).json({
            ok: false,
            msg: "Error a entrar"
        })
    }

}

const revalidarToken = async(req=request, res=response)=>{

    const uid = req.uid
    const name = req.name

    const token = await generarJWT(uid, name)

    res.json({
        ok: true,
        msg: 'renew',
        token
    })
}


module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}