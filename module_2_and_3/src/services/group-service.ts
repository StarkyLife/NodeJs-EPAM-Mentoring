import { Group } from '../types/group';
import { IGroupService } from './group-service.interface';

class GroupService implements IGroupService {
    getById(id: string): Promise<Group | null> {
        throw new Error('Method not implemented.');
    }
    getAll(): Promise<Group[]> {
        throw new Error('Method not implemented.');
    }
    createOrUpdate(group: Group): Promise<Group | null> {
        throw new Error('Method not implemented.');
    }
    removeCompletely(id: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
}

export default GroupService;
