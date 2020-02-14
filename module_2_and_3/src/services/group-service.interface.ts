import { IGroup } from '../types/group';

export interface IGroupService {
    getById(id: string): Promise<IGroup | null>;
    getAll(): Promise<IGroup[]>;
    createOrUpdate(group: IGroup): Promise<IGroup | null>;
    removeCompletely(id: string): Promise<boolean>;
}
