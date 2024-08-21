import { request, response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';
import logger from '../utils/logger.js';
import { Types } from 'mongoose';

export const validateJWT = async ( req = request, res = response, next ) => {
    
    const token = req.header( 'x-token' );
    if( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {
        
        next();
    } catch ( error ) {
        logger.error( "Al autenticar jwt: " + error );
        return res.status(401).json({
            msg: 'Token no valido'
        })
    }
}