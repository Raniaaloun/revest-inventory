import { Sequelize } from 'sequelize';

const env = process.env.NODE_ENV || 'development';
import configFile from '../config/config.json';
const config = configFile[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect as 'postgres',
  },
);

export default sequelize;
