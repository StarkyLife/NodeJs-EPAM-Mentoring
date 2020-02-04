import { Sequelize, Op } from 'sequelize';

import { User } from '../types/user';
import { UserModel, init as initUserModel } from '../models/user';

import { IDatabaseRepository } from './database-respository-interface';

const DB_CONNECTION_STRING = process.env.DB || 'postgres://localhost:5432/nodejs_mentoring';

const sequelize = new Sequelize(DB_CONNECTION_STRING);

initUserModel(sequelize);
UserModel
    .sync({ force: true })
    .then(() => UserModel.bulkCreate([
        { login: 'starky', password: 'pass', age: 25 },
        { login: 'Vika', password: 'passStrong', age: 25 },
        { login: 'Alexander', password: 'passWeak', age: 25 },
        { login: 'Andrei', password: 'passSuperStrong', age: 30 }
    ]));

function convertToUser(model: UserModel): User | null {
    if (!model) {
        return null;
    }

    return {
        id: model.user_id,
        login: model.login,
        password: model.password,
        age: model.age,
        isDeleted: model.is_deleted
    };
}

class PostgresUserRepository implements IDatabaseRepository<User> {
    checkConnection() {
        sequelize.
            authenticate()
            .then(() => console.log('Success connection'))
            .catch((error: Error) => console.log(`Error in connection ${error?.message}`));
    }

    async getById(id: string): Promise<User | null> {
        const user = await UserModel.findByPk(id);

        return convertToUser(user);
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

        return users.map(convertToUser);
    }

    async createOrUpdate(entity: User): Promise<User | null> {
        const found: UserModel = await UserModel.findByPk(entity.id);

        if (found) {
            const updatedUser =  await found.update({
                login: entity.login,
                password: entity.password,
                age: entity.age,
                is_deleted: entity.isDeleted
            });

            return convertToUser(updatedUser);
        }

        const newUser = await UserModel.create({
            user_id: entity.id,
            login: entity.login,
            password: entity.password,
            age: entity.age,
            is_deleted: entity.isDeleted
        });

        return convertToUser(newUser);
    }
}

export default PostgresUserRepository;
