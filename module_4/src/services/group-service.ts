import { IGroup } from '../types/group';
import { IDatabaseRepository, ICanAddUsersToGroup } from '../data-access/database-respository.interface';

import { IGroupService } from './group-service.interface';
import { IUser } from '../types/user';

class GroupService implements IGroupService {
    constructor(private groupRepository: IDatabaseRepository<IGroup> & ICanAddUsersToGroup) {}

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

    addUsers(groupId: string, usersIds: string[]): Promise<IUser[]> {
        return this.groupRepository.addUsers(groupId, usersIds);
    }
}

export default GroupService;
