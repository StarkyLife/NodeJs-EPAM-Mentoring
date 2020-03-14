import { Sequelize } from 'sequelize';

import { init as initUserModel } from '../models/user';
import { init as initGroupModel } from '../models/group';
import { init as initUserGroupModel } from '../models/user-group';
import { associateModels } from '../models/models-associations';

export let sequelize: Sequelize;

export async function initializeDB(connectionString: string) {
    if (sequelize) {
        return;
    }

    sequelize = new Sequelize(connectionString);

    initUserModel(sequelize);
    initGroupModel(sequelize);
    initUserGroupModel(sequelize);

    associateModels();

    await sequelize.authenticate();
}
