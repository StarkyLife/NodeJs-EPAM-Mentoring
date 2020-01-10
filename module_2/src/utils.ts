export function getObjectPropertyLexicalComparer<T extends { [key: string]: any }, K extends keyof T>(key: T[K] extends string ? K : never) {
    return (first: T, second: T): number => {
        const valueOfFirst = first[key] && first[key].toLowerCase();
        const valueOfSecond = second[key] && second[key].toLowerCase();

        if (valueOfFirst < valueOfSecond) {
            return -1;
        }
        if (valueOfFirst > valueOfSecond) {
            return 1;
        }
        return 0;
    };
}
