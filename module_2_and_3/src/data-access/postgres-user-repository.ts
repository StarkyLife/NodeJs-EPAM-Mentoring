import { User } from '../models/user';

import { IDatabaseRepository } from './database-respository-interface';

class PostgresUserRepository implements IDatabaseRepository<User> {
    get(condition: (entity: User) => boolean, limit?: number | undefined): User[] {
        throw new Error('Method not implemented.');
    }
    createOrUpdate(entity: User): User | null {
        throw new Error('Method not implemented.');
    }
}

export default PostgresUserRepository;
