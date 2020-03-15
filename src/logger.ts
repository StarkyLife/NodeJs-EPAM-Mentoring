import winston from 'winston';

const logger = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.File({ filename: 'logs.log' })
    ]
});

export default logger;
