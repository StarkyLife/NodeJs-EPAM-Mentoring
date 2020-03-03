import { IUser } from '../types/user';

export interface IDatabaseRepository<T extends object> {
    getById(id: string): Promise<T | null>;
    getByRegexp(regexpString: string, limit?: number): Promise<T[]>;
    getAll(): Promise<T[]>;

    createOrUpdate(entity: T): Promise<T | null>;

    delete(id: string): Promise<boolean>;
}

export interface ICanAddUsersToGroup {
    addUsers(groupId: string, usersIds: string[]): Promise<IUser[]>;
}
