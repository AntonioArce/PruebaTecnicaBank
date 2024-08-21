import jwt from 'jsonwebtoken';
import logger from '../utils/logger.js';

export const generateJWT = ( payload = {} ) => {
    return new Promise( (resolve, reject) => {
        jwt.sign( payload, process.env.SECRETJWTPRIVATEKEY, {
            expiresIn: '15m'
        }, ( err, token ) => {
            if( err ) {
                logger.error("Al generar el token" + err);
                reject('No se pudo generar el token');
            } else {
                resolve( token );
            }
        });
    });
}
