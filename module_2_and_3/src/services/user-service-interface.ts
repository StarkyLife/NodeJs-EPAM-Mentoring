import { User } from '../models/user';

export interface IUserService {
    getById(id: string): User | null;
    createOrUpdate(user: User): User | null;
    removeSoftly(id: string): void;
    search(login: string, limit: number): User[];
}
