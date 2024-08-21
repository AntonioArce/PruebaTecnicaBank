import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import { createLogger, format, transports } from 'winston';

dayjs.extend(utc);

/* Crea los logs de la aplicación con la hora del log cuando la función se manda a llamar */
const logger = createLogger({
    format: format.combine(
        format.simple(),
        format.printf(info => `${dayjs().utcOffset(-360).format('DD/MM/YYYY HH:mm:ss:SSS')} - ${info.level}: ${info.message}`)
    ),
    transports: [
        new transports.Console({
            level: 'debug',
            handleExceptions: false,
        })
    ]
});

export default logger