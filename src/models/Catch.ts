import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';

class Catch extends Model {
    public playerId!: number;
    public fishId!: number;
    public timestamp!: Date;
    public creditsEarned!: number; //total score
}

Catch.init(
    {
        playerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        fishId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        timestamp: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        creditsEarned: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Catch',
        tableName: 'catches',
    }
);

export default Catch;
