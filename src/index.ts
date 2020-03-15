import express from 'express';

import methodInvocationLoggingMiddleware from './middlewares/method-invokation-logging';
import errorHandlingMiddleware from './middlewares/error-handling';

import UserService from './services/user-service';
import GroupService from './services/group-service';

import { createUserRouter } from './routers/user-router';
import { createGroupRouter } from './routers/group-router';

import { initializeDB } from './data-access/database-instance';
import UserRepository from './data-access/user-repository';
import GroupRepository from './data-access/group-repository';

(async function init() {
    const app = express();

    app.listen(8080);
    app.use(express.json());

    const DB_CONNECTION_STRING = process.env.DB || 'postgres://localhost:5432/nodejs_mentoring';
    await initializeDB(DB_CONNECTION_STRING);

    const userRepository = new UserRepository();
    const groupRepository = new GroupRepository();

    const userService = new UserService(userRepository);
    const groupService = new GroupService(groupRepository);

    app.use(
        '/',
        methodInvocationLoggingMiddleware,
        createUserRouter(userService),
        createGroupRouter(groupService)
    );

    app.use(errorHandlingMiddleware);
}());
