import { request, response } from 'express';
import { validationResult } from 'express-validator';

/* Valida los campos que se reciben por peticiones a esta API */
export const validateFields = (req, res = response, next) => {
    // Se obtienen los errores de la validación
    const errors = validationResult(req);

    // Si hay errores retorna el mensaje configurado
    if (!errors.isEmpty()) {
        /* Obtiene los errores y prepara el cuerpo del mensaje que se regresará */
        const errorsMapped = errors.mapped();
        const messages = {}
        /* Se crea el nuevo objeto de mensajes excluyendo los valores sensibles */
        Object.keys(errorsMapped).forEach( ( key, index ) => {
            const { location, value, msg } = errorsMapped[key];
            if( location === 'headers' ){
                messages[ 'field' + index ] = { msg: errorsMapped[key].msg };
            } else {
                messages[key] = { value, msg };
            }
        })

        /* Regresar los mensajes formateados */
        return res.status(400).json([{
            code: 400,
            messages
        }]);
    }
    // Si no hay errores continua con la siguiente validación
    next();
};