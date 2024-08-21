import express from 'express';
import cors from 'cors';
import https from 'https';
import fs from 'fs';
import useragent from 'express-useragent'
import logger from '../utils/logger.js';

import { dbConnection } from '../database/config.js';

import { 
    authRouter,
    productsRouter,
    usersRouter
} from '../routes/index.js';


class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/auth',
            user: '/users',
            products: '/products',

            testConnection: '/test'
        }

        this.middlewares();

        this.routes();

        this.conectDB();
    }

    async conectDB(){
        await dbConnection();
    }

    middlewares(){
         // CORS
         this.app.use( cors() );

         // Lectura y Parseo del body
         this.app.use( express.json({ limit: '30mb' }));
         this.app.use( express.urlencoded({ limit: "30mb", extended: true }));

         this.app.use( useragent.express() );
    }

    routes(){
        this.app.use( this.paths.auth, authRouter );

        this.app.use( this.paths.testConnection, ( req, res ) => {
            res.status(200).json({
                msg: 'Working'
            })
        });
    }

    listen(){
        this.app.listen( this.port, () => {
            logger.info( "Servidor corriendo en puerto " + this.port );
        });
    }
}

export default Server;