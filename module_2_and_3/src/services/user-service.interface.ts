import { IUser } from '../types/user';

export interface IUserService {
    getById(id: string): Promise<IUser | null>;
    createOrUpdate(user: IUser): Promise<IUser | null>;
    removeSoftly(id: string): Promise<boolean>;
    search(login: string, limit: number): Promise<IUser[]>;
}
