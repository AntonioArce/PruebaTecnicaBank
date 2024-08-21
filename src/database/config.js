import mongoose from 'mongoose';
import logger from '../utils/logger.js';

export const dbConnection = async() => {
    try {
        await mongoose.connect( process.env.MONGODB_URL, {
            dbName: process.env.MONGODB_DBNAME,
            useNewUrlParser: false,
            useUnifiedTopology: false
        });

        logger.info( 'Base de datos online' );
    } catch( error ) {
        logger.error( "Error al conectar a la BD: " + error );
        //throw new Error( 'Error a la hora de iniciar la base de datos' );
    }
};