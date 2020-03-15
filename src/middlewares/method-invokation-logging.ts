import { RequestHandler } from 'express';

import logger from '../logger';

const methodInvocationLoggingMiddleware: RequestHandler = ({ method, url, body }, _response, next) => {
    logger.info('API Method Invokation', { method, url, body });
    next();
};

export default methodInvocationLoggingMiddleware;
