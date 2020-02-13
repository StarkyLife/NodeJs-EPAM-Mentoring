import { Group } from '../types/group';
import { IDatabaseRepository } from '../data-access/database-respository.interface';

import { IGroupService } from './group-service.interface';

class GroupService implements IGroupService {
    constructor(private groupRepository: IDatabaseRepository<Group>) {}

    getById(id: string): Promise<Group | null> {
        return this.groupRepository.getById(id);
    }
    getAll(): Promise<Group[]> {
        return this.groupRepository.getAll();
    }
    createOrUpdate(group: Group): Promise<Group | null> {
        throw new Error('Method not implemented.');
    }
    removeCompletely(id: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
}

export default GroupService;
