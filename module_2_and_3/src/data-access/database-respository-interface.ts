type TCondition<T> = (entity: T) => boolean;

export interface IDatabaseRepository<T extends object> {
    get(condition: TCondition<T>, limit?: number): T[];
    createOrUpdate(entity: T): T | null;
}
