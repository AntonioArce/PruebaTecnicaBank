/**
 * Se agregan las instancias de los paquetes de node a utilizar 
 * Se agregan las importaciones de funciones creadas
 */
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand'

dotenvExpand.expand(dotenv.config());

import Server from './models/server.js';

const server = new Server();

server.listen();