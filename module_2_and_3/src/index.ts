import express from 'express';

import UserService from './services/user-service';

import { createUserRouter } from './routers/user-router';
import PostgresUserRepository from './data-access/postgres-user-repository';

const app = express();

app.listen(8080);
app.use(express.json());

/* User Routes */

const DB_CONNECTION_STRING = process.env.DB || 'postgres://localhost:5432/nodejs_mentoring';
const userRepository = new PostgresUserRepository(DB_CONNECTION_STRING);

const userService = new UserService(userRepository);

app.use('/', createUserRouter(userService));
