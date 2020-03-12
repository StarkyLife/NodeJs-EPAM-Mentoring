import { IGroup } from '../types/group';
import { IGroupRepository } from '../data-access/group-respository.interface';

import { IGroupService } from './group-service.interface';

class GroupService implements IGroupService {
    constructor(private groupRepository: IGroupRepository) {}

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

    addUsers(groupId: string, usersIds: string[]): Promise<void> {
        return this.groupRepository.addUsers(groupId, usersIds);
    }
}

export default GroupService;
