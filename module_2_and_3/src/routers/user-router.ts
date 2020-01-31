import express, { Router } from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';

import { User } from '../models/user';
import { IUserService } from '../services/user-service-interface';

const UserValidationSchema = Joi.object<User>({
    id: Joi.string().required(),
    login: Joi.string().required(),
    passoword: Joi.string().alphanum().required(),
    age: Joi.number().greater(4).less(130).required(),
    isDeleted: Joi.bool().required()
}).required();

export function createUserRouter(userService: IUserService): Router {
    const userRouter = express.Router();
    const validator = createValidator();

    userRouter
        .get<{ id: string }>('/user/:id', (request, response) => {
            const id = request.params.id;
            const user = userService.getById(id);

            if (user) {
                response.json(user);
            }

            response.status(404).send('Not found!');
        })
        .post(
            '/user',
            validator.body(UserValidationSchema),
            (request, response) => {
                const user = request.body;
                const updatedUser = userService.createOrUpdate(user);

                if (updatedUser) {
                    response.send('User created!');
                } else {
                    response.status(500).end();
                }
            }
        )
        .get<{ search: string, limit: string }>('/user-suggest', (request, response) => {
            const { search: searchString, limit } = request.query;
            const foundUsers = userService.search(searchString, limit);

            response.json(foundUsers);
        })
        .delete<{ id: string }>('/user/:id', (request, response) => {
            const id = request.params.id;

            try {
                userService.removeSoftly(id);
                response.send('User removed!');
            } catch (error) {
                response.status(500).end();
            }
        });

    return userRouter;
}
