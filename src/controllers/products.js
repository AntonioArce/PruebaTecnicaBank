import { request, response } from "express";
import logger from "../utils/logger.js";

export const getProducts = async ( req = request, res = response ) => {
    try {
        return res.status(200).json({
            msg: "Productos consultados correctamente"
        })
    } catch (error) {
        logger.error('Error al consultar productos: ' + error );
        return res.status(500).json({
            msg: 'Error al consultar productos'
        })
    }
}