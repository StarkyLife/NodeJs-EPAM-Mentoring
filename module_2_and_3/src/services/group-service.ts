import { IGroup } from '../types/group';
import { IDatabaseRepository } from '../data-access/database-respository.interface';

import { IGroupService } from './group-service.interface';

class GroupService implements IGroupService {
    constructor(private groupRepository: IDatabaseRepository<IGroup>) {}

    getById(id: string): Promise<IGroup | null> {
        return this.groupRepository.getById(id);
    }
    getAll(): Promise<IGroup[]> {
        return this.groupRepository.getAll();
    }
    createOrUpdate(group: IGroup): Promise<IGroup | null> {
        return this.groupRepository.createOrUpdate(group);
    }
    removeCompletely(id: string): Promise<boolean> {
        return this.groupRepository.delete(id);
    }
}

export default GroupService;
