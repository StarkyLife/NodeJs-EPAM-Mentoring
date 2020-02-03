type TCondition<T> = (entity: T) => boolean;

export interface IDatabaseRepository<T extends object> {
    getById(id: string): Promise<T>;
    getByRegexp(regexpString: string, limit?: number): Promise<T[]>;

    createOrUpdate(entity: T): Promise<T | null>;
}
