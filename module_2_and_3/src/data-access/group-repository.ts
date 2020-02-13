import { Group } from '../types/group';
import { GroupModel } from '../models/group';

import { IDatabaseRepository } from './database-respository.interface';

class GroupRepository implements IDatabaseRepository<Group> {
    async getById(id: string): Promise<Group> {
        const group = await GroupModel.findByPk(id);

        return group;
    }
    getByRegexp(regexpString: string, limit?: number): Promise<Group[]> {
        throw new Error('Method not implemented.');
    }
    async getAll(): Promise<Group[]> {
        const groups = await GroupModel.findAll();

        return groups;
    }
    createOrUpdate(entity: Group): Promise<Group> {
        throw new Error('Method not implemented.');
    }
}

export default GroupRepository;
