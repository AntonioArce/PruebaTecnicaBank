import {model, Schema } from 'mongoose';

const UserSchema = new Schema({
    name:{
        type: String,
        required: [true, 'El usuario debe de tener un nombre']
    },
    email:{
        type: String,
        required: [ true, 'Especifique un email para el usuario' ],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'El usuario debe de tener password']
    },
    user_type:{
        type: String,
        required: [true, 'El tipo de usuario es obligatorio']
    },
    status: {
        type: Boolean
    }
})

export default model('users', UserSchema)