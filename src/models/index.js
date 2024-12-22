'use strict';

import fs from 'fs';
import path from 'path';
import { basename as _basename } from 'path';
import Sequelize, { DataTypes } from 'sequelize';
import { env as _env } from 'process';
const basename = _basename(__filename);
const env = _env.NODE_ENV || 'development';
import configFile from '../../config/config.json';
const config = configFile[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(_env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
  );
}

const files = fs.readdirSync(__dirname).filter((file) => {
  return (
    file.indexOf('.') !== 0 &&
    file !== basename &&
    file.endsWith('.ts') &&
    !file.endsWith('.test.ts')
  );
});

for (const file of files) {
  import(path.join(__dirname, file))
    .then((module) => {
      const model = module.default(sequelize, DataTypes);
      db[model.name] = model;
    })
    .catch((err) => {
      console.error(`Failed to import model file: ${file}`, err);
    });
}

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// export default db;
module.exports = db;
