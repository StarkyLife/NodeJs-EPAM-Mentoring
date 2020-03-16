import { Sequelize } from 'sequelize';

import { init as initUserModel } from '../models/user';
import { init as initGroupModel } from '../models/group';
import { init as initUserGroupModel } from '../models/user-group';
import { associateModels } from '../models/models-associations';

export function initializeDB(connectionString: string) {
    const sequelize = new Sequelize(connectionString);

    sequelize.authenticate()
        .then(() => console.log('Connection to Database is established!'))
        .catch(() => {
            throw new Error('Database connection error!');
        });

    initUserModel(sequelize);
    initGroupModel(sequelize);
    initUserGroupModel(sequelize);

    associateModels();

    return {
        closeConnection: sequelize.close.bind(sequelize)
    };
}
