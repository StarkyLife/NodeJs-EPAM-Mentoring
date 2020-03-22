import UserService from '../user-service';
import { IUserRepository } from '../../data-access/user-respository.interface';
import { IUser } from '../../types/user';

const createRandomUser = (data?: Partial<IUser>): IUser => ({
    id: '123',
    login: 'me',
    password: 'me-pass',
    age: 25,
    isDeleted: false,

    ...data
});

const repo: IUserRepository = {
    async getById(id: string) {
        return createRandomUser({ id });
    },
    async getByRegexp(regexpString: string) {
        return [createRandomUser({ login: regexpString })];
    },
    async createOrUpdate(entity: IUser) {
        return createRandomUser(entity);
    }
};

describe('Soft user removal', () => {
    it('should return true value if user was successfully marked with flag', async () => {
        const userService = new UserService(repo);

        const actual = await userService.removeSoftly('123');

        expect(actual).toBe(true);
    });

    it('should throw an error if user was not found', async () => {
        const userService = new UserService({ ...repo, getById: async () => null });

        await expect(userService.removeSoftly('123')).rejects.toEqual(new Error('Not Found!'));
    });

    it('should throw an error if something happened while updating user', async () => {
        const userService = new UserService({ ...repo, createOrUpdate: async () => null });

        await expect(userService.removeSoftly('123')).rejects.toEqual(new Error('Error while updating!'));
    });
});
