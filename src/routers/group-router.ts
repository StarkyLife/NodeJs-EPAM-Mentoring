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
            async (request, response) => {
                const id = request.params.id;

                try {
                    const group = await groupService.getById(id);

                    if (!group) {
                        response.status(404).send('Not found!');
                        return;
                    }

                    groupService.addUsers(group.id, ['1', '2']);

                    response.json(group);
                } catch (error) {
                    response.status(500).send(error?.message);
                }
            }
        )
        .get(
            '/groups',
            async (_request, response) => {
                try {
                    const groups = await groupService.getAll();

                    response.json(groups);
                } catch (error) {
                    response.status(500).send(error?.message);
                }
            }
        )
        .post<any, any, IGroup>(
            '/groups',
            validator.body(GroupValidationSchema),
            async (request, response) => {
                const group = request.body;

                try {
                    const updatedOrNew = await groupService.createOrUpdate(group);

                    response.json(updatedOrNew);
                } catch (error) {
                    response.status(500).send(error?.message);
                }
            }
        )
        .delete<{ id: string }>(
            '/groups/:id',
            async (request, response) => {
                const id = request.params.id;

                try {
                    await groupService.removeCompletely(id);
                    response.send('Group removed!');
                } catch (error) {
                    if (error instanceof NotFoundError) {
                        response.status(404).send('Group Not Found!');
                        return;
                    }

                    response.status(500).send(error?.message);
                }
            }
        )
        .post<{ id: string }, any, string[]>(
            '/groups/:id/users/add',
            async (request, response) => {
                const id = request.params.id;
                const usersIds = request.body;

                try {
                    const allUsersInGroup = await groupService.addUsers(id, usersIds);
                    response.json(allUsersInGroup);
                } catch (error) {
                    response.status(500).send(error?.message);
                }
            }
        );

    return router;
}
