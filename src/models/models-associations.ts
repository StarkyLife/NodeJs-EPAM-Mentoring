import { UserModel } from './user';
import { GroupModel } from './group';
import { UserGroupModel } from './user-group';

export function associateModels() {
    UserModel.belongsToMany(GroupModel, { through: UserGroupModel, foreignKey: 'user_id' });
    GroupModel.belongsToMany(UserModel, { through: UserGroupModel, foreignKey: 'group_id' });
}
