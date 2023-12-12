import mongoose from 'mongoose';
import Logger from '../logger';
import { config } from '../../config';
import { Sequelize } from 'sequelize';

mongoose.set('strictQuery', false);

export default function DB_Connect(): Promise<void> {
    return new Promise((resolve, reject) => {
        const dbType = process.env.DB_TYPE?.toLowerCase();

        if (dbType === 'mongo') {
            mongoose.set('strictQuery', false);
            mongoose
                .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
                .then(() => {
                    Logger.success(`Connected to MongoDB database called ${config.mongo.username}.`);
                    Logger.beautifulSpace();
                    resolve();
                })
                .catch((error) => {
                    Logger.fatal("Failed to connect to MongoDB, exiting... ");
                    Logger.warn("Please check your MongoDB configuration in the environment file (.env)");
                    reject(error);
                });
        } else if (dbType === 'sql') {
            const sequelize = new Sequelize(config.sql.database, config.sql.username, config.sql.password, {
                host: config.sql.host,
                port: config.sql.port,
                dialect: 'mysql'
            });

            sequelize.authenticate()
                .then(() => {
                    Logger.success(`Connected to SQL database called ${config.sql.database}.`);
                    Logger.beautifulSpace();
                    resolve();
                })
                .catch((error) => {
                    Logger.fatal("Failed to connect to SQL database, exiting... ");
                    Logger.warn("Please check your SQL database configuration in the environment file (.env)");
                    reject(error);
                });
        } else {
            Logger.fatal(`Unknown DB_TYPE '${dbType}' in .env file.`);
            reject(new Error(`Unknown DB_TYPE '${dbType}'`));
        }
    });
}