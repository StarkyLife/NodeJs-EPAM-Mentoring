import { Model, Sequelize, DataTypes } from 'sequelize';

export class UserGroupModel extends Model { }

export function init(sequelize: Sequelize): void {
    UserGroupModel.init({},
        {
            sequelize,
            tableName: 'users_groups',
            timestamps: false
        }
    );
}
