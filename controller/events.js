const { response } = require("express");
const Evento = require("../models/Evento");

/*
{
    ok: true,
    msg: 'Obtener eventos'
}
*/
const getEvento = async(req, res=response)=>{

    const eventos = await Evento.find().populate('user', 'name')

    res.json({
        ok: true,
        eventos
    })
}
const crearEvento = async(req, res=response)=>{
    const evento = new Evento(req.body)
    try {
        
        evento.user = req.uid;

        const eventoGuardado = await evento.save()

        res.json({
            ok: true,
            evento: eventoGuardado
        })



    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: true,
            msg: 'Salio mal crear Eventos'
        })
    }

}

const actualizarEvento = async(req, res=response)=>{
    const { id } = req.params
    const uid = req.uid;

    try {
        
        const evento = await Evento.findById(id);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'El evento no existe con ese id'
            })
        }

        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            })
        }

        const nuevoEvento = {...req.body, user: uid}

        const eventoActualizado = await Evento.findByIdAndUpdate(id, nuevoEvento, {new: true})

        res.json({
            ok: true,  
            evento: eventoActualizado
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: true,
            msg: "Hable con el admin"
        })
    }
}
const eliminarEvento = async(req, res)=>{
    const { id } = req.params
    const uid = req.uid;

    try {
        
        const evento = await Evento.findById(id);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'El evento no existe con ese id'
            })
        }

        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de eliminar este evento'
            })
        }

        await Evento.findByIdAndDelete(id)

        res.json({
            ok: true,  
            msg: "El evento se eliminó"
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el admin"
        })
    }
}

module.exports = {
    getEvento,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}