import winston from 'winston';

export const Logger = winston.createLogger({
    level: 'error',
    transports: [
        new winston.transports.Console(),
    ],
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.prettyPrint()
    ),
});

export const commonErrorHandler = (err, req, res, next) => {
    Logger.error(err.stack);
    res.status(500).send('Internal Server Error, sorry!');
};
