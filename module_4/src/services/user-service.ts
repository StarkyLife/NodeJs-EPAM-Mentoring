import { IUser } from '../types/user';
import { IUserRepository } from '../data-access/user-respository.interface';
import { getObjectPropertyLexicalComparer } from '../utils';

import { IUserService } from './user-service.interface';

class UserService implements IUserService {
    constructor(private userRepository: IUserRepository) {}

    getById(id: string) {
        return this.userRepository.getById(id);
    }

    createOrUpdate(user: IUser) {
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

        return foundUsers.sort(getObjectPropertyLexicalComparer<IUser, 'login'>('login'));
    }
}

export default UserService;
