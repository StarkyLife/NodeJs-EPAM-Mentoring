import { Model, Sequelize, DataTypes } from 'sequelize';

import { TPermissions, permissions } from '../types/group';

export class GroupModel extends Model {
    id!: string;
    name!: string;
    permissions!: TPermissions;
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
            sequelize,
            tableName: 'groups',
            timestamps: false
        }
    );
}
