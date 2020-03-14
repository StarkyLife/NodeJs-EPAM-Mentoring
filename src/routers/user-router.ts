import express, { Router } from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';

import { IUser } from '../types/user';
import { IUserService } from '../services/user-service.interface';

const UserValidationSchema = Joi.object<IUser>({
    id: Joi.string().required(),
    login: Joi.string().required(),
    password: Joi.string().alphanum().required(),
    age: Joi.number().greater(4).less(130).required(),
    isDeleted: Joi.bool().required()
}).required();

export function createUserRouter(userService: IUserService): Router {
    const userRouter = express.Router();
    const validator = createValidator();

    userRouter
        .get<{ id: string }>(
            '/users/:id',
            async (request, response) => {
                const id = request.params.id;

                try {
                    const user = await userService.getById(id);

                    if (!user) {
                        response.status(404).send('Not found!');
                        return;
                    }

                    response.json(user);
                } catch (error) {
                    response.status(500).send(error?.message);
                }
            }
        )
        .post(
            '/users',
            validator.body(UserValidationSchema),
            async (request, response) => {
                const user = request.body;

                try {
                    const updatedOrNew = await userService.createOrUpdate(user);

                    response.json(updatedOrNew);
                } catch (error) {
                    response.status(500).send(error?.message);
                }
            }
        )
        .get(
            '/users',
            async (request, response) => {
                const { login, limit } = request.query as { login: string, limit: string };

                try {
                    const foundUsers = await userService.search(login, +limit);

                    response.json(foundUsers);
                } catch (error) {
                    response.status(500).send(error?.message);
                }
            }
        )
        .delete<{ id: string }>(
            '/users/:id',
            async (request, response) => {
                const id = request.params.id;

                try {
                    await userService.removeSoftly(id);
                    response.send('User removed!');
                } catch (error) {
                    response.status(500).send(error?.message);
                }
            }
        );

    return userRouter;
}
