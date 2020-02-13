import { Group } from '../types/group';

export interface IGroupService {
    getById(id: string): Promise<Group | null>;
    getAll(): Promise<Group[]>;
    createOrUpdate(group: Group): Promise<Group | null>;
    removeCompletely(id: string): Promise<boolean>;
}
