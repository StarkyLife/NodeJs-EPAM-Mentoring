export type User = {
    id: string;
    login: string;
    passoword: string;
    age: number;
    isDeleted: boolean;
};

const user: User = {
    id: '1',
    login: '2',
    passoword: 'password',
    age: 12,
    isDeleted: false
};

console.log(user);
