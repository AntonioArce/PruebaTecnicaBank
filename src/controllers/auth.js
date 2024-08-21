import { request, response } from "express";
import { User } from '../models/index.js'
import { generateJWT } from '../helpers/index.js'
import bcryptjs from 'bcryptjs';
import logger from "../utils/logger.js";

export const login = async ( req = request, res = response ) => {
    const { mail, password } = req.body
    try {

        const user = await User.findOne({
            email: mail,
            status: true
        })

        if( !user ){
            logger.warn(`Inicio de sesión incorrecto, no se encontró usuario con correo ${ mail }`)
            return res.status(400).json({
                code: 400,
                msg: 'Usuario / Password no son correctos - correo'
            })
        }

        const validPassword = bcryptjs.compareSync( password, user.password );

        if( !validPassword ) {
            logger.warn(`Contraseña incorrecta para usuario ${ mail }`);    
            return res.status(400).json({
                code: 400,
                msg: 'Usuario / Password no son correctos - password'
            })
        }

        const payload = {
            usrId: user._id
        }

        // Generar Token
        const token = await generateJWT( payload );

        const newObjectUser = {
            name: user.name,
            mail: user.email,
            user_type: user.user_type,
            status: user.status
        }

        logger.info(`Sesion iniciada por el usuario: ${ mail }`);

        res.status(200).json({
            msg: 'Sesion iniciada correctamente',
            user: newObjectUser,
            token
        })
    } catch ( error ) {
        logger.info("Error al iniciar sesion: " + error)
        return res.status(500).json({
            code: 500,
            msg: "Algo salió mal al buscar el usuario"
        });
    }
};