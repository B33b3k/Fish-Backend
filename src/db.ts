const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('fishbackend', 'fishbackend_owner', 'Rcd7To6kWMps', {
    host: 'ep-sparkling-star-a89glrw5.eastus2.azure.neon.tech',
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
});


async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connected Neon PostgresQl sucessfully.');
    } catch (error) {
        console.error('Error: Database not connected:', error);
    }
}

testConnection();

export default sequelize;
