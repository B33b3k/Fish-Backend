import express from 'express';
import bodyParser from 'body-parser';
import playerRoutes from './routes/playerRoute';
import catchRoutes from './routes/catchRoute';
import fishRoutes from './routes/fishRoute';
import sequelize from './db';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/players', playerRoutes);
app.use('/api/catch', catchRoutes);
app.use('/api/fish', fishRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}
);


// sequelize.sync({ force: true }) 
//     .then(() => {
//         console.log('Database & tables created!');
//         app.listen(PORT, () => {
//             console.log(`Server is running on port ${PORT}`);
//         });
//     })
//     .catch((error: String) => {
//         console.error('Failed to sync database:', error);
//     });