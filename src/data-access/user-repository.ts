import { Op } from 'sequelize';

import { IUser } from '../types/user';
import { UserModel } from '../models/user';

import { IUserRepository } from './user-respository.interface';

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

class UserRepository implements IUserRepository {
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
}

export default UserRepository;
