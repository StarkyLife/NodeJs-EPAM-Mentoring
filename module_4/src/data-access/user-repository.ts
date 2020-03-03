import { Op } from 'sequelize';

import { IUser } from '../types/user';
import { UserModel } from '../models/user';

import { IDatabaseRepository } from './database-respository.interface';

function convertToUser(model: UserModel): IUser | null {
    if (!model) {
        return null;
    }

    return {
        id: model.id,
        login: model.login,
        password: model.password,
        age: model.age,
        isDeleted: model.is_deleted
    };
}

class UserRepository implements IDatabaseRepository<IUser> {
    async getById(id: string): Promise<IUser | null> {
        const user = await UserModel.findByPk(id);

        return convertToUser(user);
    }

    async getByRegexp(regexpString: string, limit?: number | undefined): Promise<IUser[]> {
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

    async getAll(): Promise<IUser[]> {
        const users = await UserModel.findAll();

        return users.map(convertToUser);
    }

    async createOrUpdate(entity: IUser): Promise<IUser | null> {
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
            login: entity.login,
            password: entity.password,
            age: entity.age,
            is_deleted: entity.isDeleted
        });

        return convertToUser(newUser);
    }

    async delete(): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
}

export default UserRepository;
