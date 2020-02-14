import { IGroup } from '../types/group';
import { GroupModel } from '../models/group';

import { IDatabaseRepository } from './database-respository.interface';

class GroupRepository implements IDatabaseRepository<IGroup> {
    async getById(id: string): Promise<IGroup> {
        const group = await GroupModel.findByPk(id);

        return group;
    }
    getByRegexp(): Promise<IGroup[]> {
        throw new Error('Method not implemented.');
    }
    async getAll(): Promise<IGroup[]> {
        const groups = await GroupModel.findAll();

        return groups;
    }
    async createOrUpdate(entity: IGroup): Promise<IGroup> {
        const found: GroupModel = await GroupModel.findByPk(entity.id);

        if (found) {
            const updated =  await found.update({
                name: entity.name,
                permissions: entity.permissions
            });

            return updated;
        }

        const newGroup = await GroupModel.create({
            name: entity.name,
            permissions: entity.permissions
        });

        return newGroup;
    }
    async delete(id: string): Promise<boolean> {
        const found: GroupModel = await GroupModel.findByPk(id);

        if (!found) {
            return true;
        }

        const isDestroyed = found.destroy();

        return !!isDestroyed;
    }
}

export default GroupRepository;
