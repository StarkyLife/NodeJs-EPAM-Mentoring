import { ErrorRequestHandler } from 'express';

import logger from '../logger';

// NOTE: важно чтобы было 4 аргумента у функции, иначе express не поймет, что это мидлвара для ошибок
const errorHandlingMiddleware: ErrorRequestHandler = (error, { method, url }, response, _next) => {
    const errorMessage = error?.message;

    logger.error(errorMessage, { method, url });

    return response.status(500).end(errorMessage);
};

export default errorHandlingMiddleware;
