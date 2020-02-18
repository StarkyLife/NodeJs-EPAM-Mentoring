import { UserModel } from './user';
import { GroupModel } from './group';
import { UserGroupModel } from './user-group';

export function associateModels() {
    UserGroupModel.belongsTo(UserModel, { foreignKey: 'userId' });
    UserGroupModel.belongsTo(GroupModel, { foreignKey: 'groupId' });

    UserModel.belongsToMany(GroupModel, { through: UserGroupModel, foreignKey: 'userId', as: 'groups' });
    GroupModel.belongsToMany(UserModel, { through: UserGroupModel, foreignKey: 'groupId', as: 'users' });
}
