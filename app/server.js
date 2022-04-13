import { App } from './app.js';
import { DbContext } from './data-access/db-connector.js';
import dotenv from 'dotenv';
dotenv.config({
    path: './.env'
});

const PORT = Number(process.env.port) || 3000;
const app = new App();

async function init() {
    console.log('Checking database connection...');
    try {
        await DbContext.authenticate();
        console.log('Database connection OK!');
        await DbContext.sync({ force: true });
        console.log(`Starting Sequelize + Express example on port ${PORT}...`);

        app.run(PORT);
    } catch (error) {
        console.log('Unable to connect to the database:');
        console.log(error.message);
        process.exit(1);
    }
}

init();
