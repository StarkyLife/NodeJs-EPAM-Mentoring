import { User } from '../models/user';
import { IDatabaseRepository } from '../data-access/database-respository-interface';
import { IUserService } from './user-service-interface';

import { getObjectPropertyLexicalComparer } from '../utils';

class UserService implements IUserService {
    constructor(private userRepository: IDatabaseRepository<User>) {}

    getById(id: string) {
        const users = this.userRepository.get((u) => u.id === id, 1);

        return users && users.length > 0
            ? users[0]
            : null;
    }

    createOrUpdate(user: User) {
        return  this.userRepository.createOrUpdate(user);
    }

    removeSoftly(id: string) {
        const found = this.getById(id);

        if (!found) {
            throw new Error('Not Found!');
        }

        const updatedUser = this.userRepository.createOrUpdate({
            ...found,
            isDeleted: true
        });

        if (!updatedUser) {
            throw new Error('Error while updating!');
        }

        return true;
    }

    search(login: string, limit: number) {
        const regexp = new RegExp(login, 'i');

        const foundUsers = this.userRepository.get((user) => regexp.test(user.login), limit);

        return foundUsers.sort(getObjectPropertyLexicalComparer<User, 'login'>('login'));
    }
}

export default UserService;
