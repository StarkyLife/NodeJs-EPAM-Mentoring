import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import Joi from '@hapi/joi';
import { createValidator } from 'express-joi-validation';

import { IUser } from '../types/user';
import { IUserService } from '../services/user-service.interface';

/* TYPES */

type TAuthInfo = Pick<IUser, 'login' | 'password'>;

/* DATA VALIDATOR */

const AuthValidationSchema = Joi.object<TAuthInfo>({
    login: Joi.string().required(),
    password: Joi.string().alphanum().required()
}).required();

export const authValidatorMiddleware = createValidator().body(AuthValidationSchema);

export function initializeAuth(
    userService: IUserService,
    options: { secret: string }
): {
    loginMiddleware: RequestHandler;
    tokenCheckMiddleware: RequestHandler;
} {
    return {
        async loginMiddleware(request, response, next) {
            const { login, password } = request.body;

            try {
                const user = await userService.checkUserCredentials(login, password);

                if (!user) {
                    return response.status(403).send('Bad username/password combination.');
                }

                const payload = { userId: user.id };
                const token = jwt.sign(payload, options.secret, { expiresIn: 300 });

                return response.send({ token });
            } catch (error) {
                return next(error);
            }
        },
        async tokenCheckMiddleware(request, response, next) {
            const token = request.headers['x-access-token'] as string;

            if (!token) {
                return response.status(401).send('Token is not provided.');
            }

            jwt.verify(token, options.secret, (error) => {
                if (error) {
                    return response.status(403).send('Invalid token.');
                }

                return next();
            });
        }
    };
}
