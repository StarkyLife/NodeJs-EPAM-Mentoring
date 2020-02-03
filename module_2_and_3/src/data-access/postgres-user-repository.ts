import { Sequelize, Op } from 'sequelize';

import { User } from '../models/user';
import { UserModel, init as initUserModel } from './user-model';

import { IDatabaseRepository } from './database-respository-interface';

const sequelize = new Sequelize('postgres://localhost:5432/nodejs_mentoring');
initUserModel(sequelize);

class PostgresUserRepository implements IDatabaseRepository<User> {
    checkConnection() {
        sequelize.
            authenticate()
            .then(() => console.log('Success connection'))
            .catch((error: Error) => console.log(`Error in connection ${error?.message}`));
    }

    async getById(id: string): Promise<User> {
        const user = await UserModel.findByPk(id);

        return user;
    }

    async getByRegexp(regexpString: string, limit?: number | undefined): Promise<User[]> {
        const users = await UserModel.findAll({
            where: {
                login: {
                    [Op.iRegexp]: regexpString
                }
            },
            limit
        });

        return users;
    }

    async createOrUpdate(entity: User): Promise<User | null> {
        // TODO: map User to UserModel
        const updatedUser = await UserModel.create(entity);

        return updatedUser;
    }
}

export default PostgresUserRepository;
