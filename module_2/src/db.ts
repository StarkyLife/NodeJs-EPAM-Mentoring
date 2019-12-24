import { User } from './user-entity';

const users: User[] = [
    {
        id: '1',
        login: 'Ilshat',
        passoword: 'pass',
        age: 25,
        isDeleted: false
    },
    {
        id: '2',
        login: 'Vika',
        passoword: 'passStrong',
        age: 25,
        isDeleted: false
    },
    {
        id: '3',
        login: 'Alexander',
        passoword: 'passWear',
        age: 25,
        isDeleted: false
    },
    {
        id: '4',
        login: 'Andrei',
        passoword: 'passSuperStrong',
        age: 30,
        isDeleted: false
    }
];

function getUserById(id: string): User | null {
    return users.find(user => user.id === id) || null;
}

function createOrUpdateUser(user: User): void {
    const existingUserIdx = users.findIndex(u => u.id === user.id);

    if (existingUserIdx === -1) {
        users.push(user);
    } else {
        users[existingUserIdx] = user;
    }
}

function removeUserSoftly(id: string): void {
    const existingUserIdx = users.findIndex(u => u.id === id);

    if (existingUserIdx !== -1) {
        users[existingUserIdx].isDeleted = true;
    }
}

function getAutoSuggestUsers(loginSubstring: string, limit: number): User[] {
    const foundUsers: User[] = [];

    const regexp = new RegExp(loginSubstring, 'i');

    for (const user of users) {
        if (regexp.test(user.login)) {
            foundUsers.push(user);
        }
        if (foundUsers.length >= limit) {
            break;
        }
    }

    return foundUsers;
}

export default {
    getUserById,
    createOrUpdateUser,
    removeUserSoftly,
    getAutoSuggestUsers
};
