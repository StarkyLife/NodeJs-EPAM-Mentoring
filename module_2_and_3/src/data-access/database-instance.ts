import { Sequelize } from 'sequelize';

import { init as initUserModel } from '../models/user';
import { init as initGroupModel } from '../models/group';
import { associateModels } from '../models/models-associations';

export let sequelize: Sequelize;

export function initializeDB(connectionString: string) {
    if (sequelize) {
        return;
    }

    sequelize = new Sequelize(connectionString);

    initUserModel(sequelize);
    initGroupModel(sequelize);

    associateModels();

    sequelize.authenticate()
        .then(() => console.log('Success connection'))
        .catch((error: Error) => console.log(`Error in connection ${error?.message}`));
}
