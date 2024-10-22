import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';

class Fish extends Model {
    public id!: number;
    public name!: string;
    public hitPoints!: number; // hp of fish
    public speed!: number;
    public payoutMultiplier!: number; // credits earned from each fish

    public frequency!: number; // no of fish
}

Fish.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        hitPoints: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        speed: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        payoutMultiplier: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        frequency: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Fish',
        tableName: 'fishes',
    }
);

export default Fish;
