import Joi from '@hapi/joi';

export type User = {
    id: string;
    login: string;
    passoword: string;
    age: number;
    isDeleted: boolean;
};

export const UserValidationSchema = Joi.object<User>({
    id: Joi.string().required(),
    login: Joi.string().required(),
    passoword: Joi.string().alphanum().required(),
    age: Joi.number().greater(4).less(130).required(),
    isDeleted: Joi.bool().required()
}).required();
