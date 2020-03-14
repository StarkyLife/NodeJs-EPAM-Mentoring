import { IUser } from '../types/user';

export interface IUserRepository {
    getById(id: string): Promise<IUser | null>;
    getByRegexp(regexpString: string, limit?: number): Promise<IUser[]>;

    createOrUpdate(entity: IUser): Promise<IUser | null>;
}
