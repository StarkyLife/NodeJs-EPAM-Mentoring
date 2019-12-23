import express from 'express';
import db from './db';

const router = express.Router();

router.get<{ id: string }>('/user/:id', (request, response) => {
    const id = request.params.id;
    const user = db.getUserById(id);

    response.json(user);
});

router.post('/user', (request, response) => {
    const user = request.body;
    db.createOrUpdateUser(user);

    response.send();
});

router.get<{ search: string, limit: string }>('/user-suggest', (request, response) => {
    const { search, limit } = request.query;
    const foundUsers = db.getAutoSuggestUsers(search, limit);

    response.json(foundUsers);
});

router.delete<{ id: string }>('/user/:id', (request, response) => {
    const id = request.params.id;
    db.removeUserSoftly(id);

    response.send();
});

export default router;
