import express from 'express';
import { createValidator } from 'express-joi-validation';

import db from './db';
import { UserValidationSchema } from './user-entity';

const router = express.Router();
const validator = createValidator();

router
    .get<{ id: string }>('/user/:id', (request, response) => {
        const id = request.params.id;
        const user = db.getUserById(id);

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
            db.createOrUpdateUser(user);

            response.send('User created!');
        }
    )
    .get<{ search: string, limit: string }>('/user-suggest', (request, response) => {
        const { search, limit } = request.query;
        const foundUsers = db.getAutoSuggestUsers(search, limit);

        response.json(foundUsers);
    })
    .delete<{ id: string }>('/user/:id', (request, response) => {
        const id = request.params.id;
        db.removeUserSoftly(id);

        response.send('User removed!');
    });

export default router;
