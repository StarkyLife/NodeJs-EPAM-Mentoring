import express, { Router } from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';

import { IGroupService } from '../services/group-service.interface';
import { Group } from '../types/group';

const GroupValidationSchema = Joi.object<Group>({
    id: Joi.string().required(),
    name: Joi.string().required(),
    permissions: Joi.string().required()
}).required();

export function createGroupRouter(groupService: IGroupService): Router {
    const router = express.Router();
    const validator = createValidator();

    router
        .get<{ id: string }>(
            '/group/:id',
            async (request, response) => {
                const id = request.params.id;

                try {
                    const group = await groupService.getById(id);

                    if (!group) {
                        response.status(404).send('Not found!');
                    }

                    response.json(group);
                } catch (error) {
                    response.status(500).send(error?.message);
                }
            }
        )
        .get(
            '/groups',
            async (request, response) => {
                try {
                    const groups = await groupService.getAll();

                    response.json(groups);
                } catch (error) {
                    response.status(500).send(error?.message);
                }
            }
        )
        .post(
            '/group',
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
            '/group/:id',
            async (request, response) => {
                const id = request.params.id;

                try {
                    await groupService.removeCompletely(id);
                    response.send('Group removed!');
                } catch (error) {
                    response.status(500).send(error?.message);
                }
            }
        );

    return router;
}
