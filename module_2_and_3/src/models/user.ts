import { Model, Sequelize, DataTypes } from 'sequelize';

export class UserModel extends Model {
    id!: string;
    login!: string;
    password!: string;
    age!: number;
    is_deleted!: boolean;
}

export function init(sequelize: Sequelize): void {
    UserModel.init(
        {
            login: {
                type: new DataTypes.STRING(50),
                allowNull: false
            },
            password: {
                type: new DataTypes.STRING(50),
                allowNull: false
            },
            age: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            is_deleted: {
                type: DataTypes.BOOLEAN,
                defaultValue: '0'
            }
        },
        {
            sequelize,
            tableName: 'users',
            timestamps: false
        }
    );
}
