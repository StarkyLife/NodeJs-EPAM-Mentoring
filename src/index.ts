import express from 'express';

import logger from './logger';

import methodInvocationLoggingMiddleware from './middlewares/method-invokation-logging';
import errorHandlingMiddleware from './middlewares/error-handling';

import UserService from './services/user-service';
import GroupService from './services/group-service';

import { createUserRouter } from './routers/user-router';
import { createGroupRouter } from './routers/group-router';

import { initializeDB } from './data-access/database-instance';
import UserRepository from './data-access/user-repository';
import GroupRepository from './data-access/group-repository';

const app = express();

app.use(express.json());

const DB_CONNECTION_STRING = process.env.DB || 'postgres://localhost:5432/nodejs_mentoring';
const db = initializeDB(DB_CONNECTION_STRING);

const userRepository = new UserRepository();
const groupRepository = new GroupRepository();

const userService = new UserService(userRepository);
const groupService = new GroupService(groupRepository);

app.use(
    '/',
    methodInvocationLoggingMiddleware
);
app.use(
    '/users',
    createUserRouter(userService)
);
app.use(
    '/groups',
    createGroupRouter(groupService)
);
app.use(errorHandlingMiddleware);

const server = app.listen(8080);

process.on('uncaughtException', async (error) => {
    try {
        await new Promise((resolve) => {
            logger.error('uncaughtException', error);
            logger.on('end', resolve);
        });

        if (server) {
            await new Promise(server.close.bind(server));
            console.log('Server closed!');
        }

        if (db) {
            await db.closeConnection();
            console.log('Database connection is closed!');
        }
    } finally {
        process.exit(1);
    }
});

process.on('unhandledRejection', (error) => {
    if (error) {
        logger.error('unhandledRejection', error);
    }
});
