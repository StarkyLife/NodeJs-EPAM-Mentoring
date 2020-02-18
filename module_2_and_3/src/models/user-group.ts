import { Model, Sequelize, DataTypes } from 'sequelize';

export class UserGroupModel extends Model {
    id!: string;
    userId!: string;
    groupId!: string;
}

export function init(sequelize: Sequelize): void {
    UserGroupModel.init(
        {
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            groupId: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        {
            sequelize,
            tableName: 'usersgroups',
            timestamps: false
        }
    );
}
