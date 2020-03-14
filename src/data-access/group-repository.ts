import { IGroup } from '../types/group';
import { NotFoundError } from '../types/errors';
import { GroupModel } from '../models/group';

import { IGroupRepository } from './group-respository.interface';

class GroupRepository implements IGroupRepository {
    async getById(id: string): Promise<IGroup> {
        const group = await GroupModel.findByPk(id);

        return group;
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
            throw new NotFoundError();
        }

        const isDestroyed = found.destroy();

        return !!isDestroyed;
    }

    async addUsers(groupId: string, usersIds: string[]): Promise<void> {
        const group: GroupModel = await GroupModel.findByPk(groupId);

        await group.addUsers(usersIds);
    }
}

export default GroupRepository;
