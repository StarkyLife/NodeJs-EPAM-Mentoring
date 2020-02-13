import { User } from '../types/user';
import { IDatabaseRepository } from '../data-access/database-respository.interface';
import { IUserService } from './user-service.interface';

import { getObjectPropertyLexicalComparer } from '../utils';

class UserService implements IUserService {
    constructor(private userRepository: IDatabaseRepository<User>) {}

    getById(id: string) {
        return this.userRepository.getById(id);
    }

    createOrUpdate(user: User) {
        return this.userRepository.createOrUpdate(user);
    }

    async removeSoftly(id: string) {
        const found = await this.getById(id);

        if (!found) {
            throw new Error('Not Found!');
        }

        const updatedUser = await this.userRepository.createOrUpdate({
            ...found,
            isDeleted: true
        });

        if (!updatedUser) {
            throw new Error('Error while updating!');
        }

        return true;
    }

    async search(login: string, limit: number) {
        const foundUsers = await this.userRepository.getByRegexp(login, limit);

        return foundUsers.sort(getObjectPropertyLexicalComparer<User, 'login'>('login'));
    }
}

export default UserService;
