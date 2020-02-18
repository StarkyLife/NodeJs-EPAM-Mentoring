import { Model, Sequelize, DataTypes, HasManyAddAssociationsMixin, HasManyGetAssociationsMixin } from 'sequelize';

import { TPermissions, permissions } from '../types/group';

import { UserModel } from './user';

export class GroupModel extends Model {
    id!: string;
    name!: string;
    permissions!: TPermissions;

    addUsers!: HasManyAddAssociationsMixin<UserModel, string>;
    getUsers!: HasManyGetAssociationsMixin<UserModel>;
}

export function init(sequelize: Sequelize): void {
    GroupModel.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            permissions: {
                type: new DataTypes.ARRAY(
                    new DataTypes.ENUM<TPermissions>(...permissions)
                ),
                defaultValue: []
            }
        },
        {
            name: {
                singular: 'group',
                plural: 'groups'
            },
            sequelize,
            tableName: 'groups',
            timestamps: false
        }
    );
}
