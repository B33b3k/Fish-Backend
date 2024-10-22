import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';

class Player extends Model {
    public id!: number;
    public name!: string;
    public credits!: number;
}

Player.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,//creates new id for each new player
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        credits: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    },
    {
        sequelize,
        modelName: 'Player',
        tableName: 'players',

    }
);

export default Player;
