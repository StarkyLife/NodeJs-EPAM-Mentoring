import { Model, Sequelize, DataTypes } from 'sequelize';

import { Permissions } from '../types/group';

export class GroupModel extends Model {
    id!: string;
    name!: string;
    permissions!: Permissions;
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
                    new DataTypes.ENUM<Permissions>(
                        'READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'
                    )
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
