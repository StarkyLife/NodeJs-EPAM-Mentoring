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
            async (request, response, next) => {
                const id = request.params.id;

                try {
                    const user = await userService.getById(id);

                    if (!user) {
                        response.status(404).send('Not found!');
                        return;
                    }

                    return response.json(user);
                } catch (error) {
                    return next(error);
                }
            }
        )
        .post(
            '/users',
            validator.body(UserValidationSchema),
            async (request, response, next) => {
                const user = request.body;

                try {
                    const updatedOrNew = await userService.createOrUpdate(user);

                    return response.json(updatedOrNew);
                } catch (error) {
                    return next(error);
                }
            }
        )
        .get(
            '/users',
            async (request, response, next) => {
                const { login, limit } = request.query as { login: string, limit: string };

                try {
                    const foundUsers = await userService.search(login, +limit);

                    return response.json(foundUsers);
                } catch (error) {
                    return next(error);
                }
            }
        )
        .delete<{ id: string }>(
            '/users/:id',
            async (request, response, next) => {
                const id = request.params.id;

                try {
                    await userService.removeSoftly(id);
                    return response.send('User removed!');
                } catch (error) {
                    return next(error);
                }
            }
        );

    return userRouter;
}
