import { User } from '../types/user';

export interface IUserService {
    getById(id: string): Promise<User | null>;
    createOrUpdate(user: User): Promise<User | null>;
    removeSoftly(id: string): Promise<boolean>;
    search(login: string, limit: number): Promise<User[]>;
}
