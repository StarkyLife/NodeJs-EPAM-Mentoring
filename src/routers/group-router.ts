import express, { Router } from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';

import { IGroupService } from '../services/group-service.interface';
import { IGroup, permissions } from '../types/group';
import { NotFoundError } from '../types/errors';

const GroupValidationSchema = Joi.object<IGroup>({
    id: Joi.string(),
    name: Joi.string().required(),
    permissions: Joi.array()
        .items(Joi.string().valid(...permissions))
        .min(1)
        .required()
}).required();

export function createGroupRouter(groupService: IGroupService): Router {
    const router = express.Router();
    const validator = createValidator();

    router
        .get<{ id: string }>(
            '/groups/:id',
            async (request, response, next) => {
                const id = request.params.id;

                try {
                    const group = await groupService.getById(id);

                    if (!group) {
                        return response.status(404).send('Not found!');
                    }

                    groupService.addUsers(group.id, ['1', '2']);

                    return response.json(group);
                } catch (error) {
                    return next(error);
                }
            }
        )
        .get(
            '/groups',
            async (_request, response, next) => {
                try {
                    const groups = await groupService.getAll();

                    return response.json(groups);
                } catch (error) {
                    return next(error);
                }
            }
        )
        .post<any, any, IGroup>(
            '/groups',
            validator.body(GroupValidationSchema),
            async (request, response, next) => {
                const group = request.body;

                try {
                    const updatedOrNew = await groupService.createOrUpdate(group);

                    return response.json(updatedOrNew);
                } catch (error) {
                    return next(error);
                }
            }
        )
        .delete<{ id: string }>(
            '/groups/:id',
            async (request, response, next) => {
                const id = request.params.id;

                try {
                    await groupService.removeCompletely(id);
                    return response.send('Group removed!');
                } catch (error) {
                    if (error instanceof NotFoundError) {
                        return response.status(404).send('Group Not Found!');
                    }

                    return next(error);
                }
            }
        )
        .post<{ id: string }, any, string[]>(
            '/groups/:id/users/add',
            async (request, response, next) => {
                const id = request.params.id;
                const usersIds = request.body;

                try {
                    const allUsersInGroup = await groupService.addUsers(id, usersIds);
                    return response.json(allUsersInGroup);
                } catch (error) {
                    return next(error);
                }
            }
        );

    return router;
}
