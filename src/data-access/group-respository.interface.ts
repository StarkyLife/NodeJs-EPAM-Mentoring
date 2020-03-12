import { IGroup } from '../types/group';

export interface IGroupRepository {
    getById(id: string): Promise<IGroup | null>;
    getAll(): Promise<IGroup[]>;

    createOrUpdate(entity: IGroup): Promise<IGroup | null>;

    delete(id: string): Promise<boolean>;

    addUsers(groupId: string, usersIds: string[]): Promise<void>;
}
