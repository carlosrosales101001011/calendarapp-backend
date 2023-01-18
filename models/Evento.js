const { Schema, model } = require("mongoose");

const EventoSchema= Schema({
    title:{
        type: String,
        required: true,
    },
    notes:{
        type: String
    },
    start:{
        type: Date,
        required: true,
    },
    end:{
        type: Date,
        required: true,
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    }

})


//Es para quitar de la vista a '_v' y '_id'
EventoSchema.method('toJSON', function () {
    const {_v, _id, ...Object} = this.toObject()
    Object.id= _id
    return Object

})

module.exports = model('Evento', EventoSchema)