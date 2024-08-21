import { request, response } from "express";
import logger from "../utils/logger.js";

export const login = async( req = request, res = response ) => {

    const { mail, password } = req.body

    try {
        res.status(200).json({
            msg: 'Sesion iniciada correctamente'
        })
    } catch ( error ) {
        logger.info("Error al iniciar sesion: " + error)
        return res.status(500).json({
            code: 500,
            msg: "Algo salió mal al buscar el usuario"
        });
    }
};