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

describe('Search for users by term', () => {
    it('should find users that are have given substring in their login', async () => {
        const userService = new UserService(repo);

        const actual = await userService.search('random-login', 1);

        expect(actual[0].login).toEqual('random-login');
    });
    it('should sort found users by their logins in lexical order', async () => {
        const userService = new UserService({
            ...repo,
            getByRegexp: async () => ([
                createRandomUser({ login: 'zuandrew' }),
                createRandomUser({ login: 'andrew' })
            ])
        });

        const actual = await userService.search('and', 2);

        expect(actual.map((u) => u.login)).toEqual(['andrew', 'zuandrew']);
    });
});

describe('Checking user credentials', () => {
    it('should return user, if given login and password are matches', async () => {
        const userLogin = 'Me';
        const userPassword = 'passwordOfMe';

        const userService = new UserService({
            ...repo,
            getByRegexp: async () => ([createRandomUser({
                login: userLogin, password: userPassword
            })])
        });

        const actual = await userService.checkUserCredentials(userLogin, userPassword);

        expect(actual).toMatchObject({ login: userLogin, password: userPassword });
    });

    it('should return `null` if password do not match', async () => {
        const userLogin = 'Ilshat';

        const userService = new UserService({
            ...repo,
            getByRegexp: async () => ([createRandomUser({
                login: userLogin,
                password: 'random'
            })])
        });

        const actual = await userService.checkUserCredentials(userLogin, 'incorrect');

        expect(actual).toBeNull();
    });
});
