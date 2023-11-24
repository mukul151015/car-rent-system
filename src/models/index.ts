/* eslint-disable no-undef */
'use strict';

import { Sequelize } from 'sequelize-typescript';
import { config } from '../config/config';
import { User } from './User/user';
import { Car } from './Car/car';
import { Trip } from './Trip/trip';
import { Expenditure } from './Expenditure/expenditure';


const models = [User,Car,Trip,Expenditure];

const db: any = {};
const dbConfig = config.dbConfig;
let sequelize: Sequelize;
sequelize = new Sequelize(
  'postgres://' +
    dbConfig.username +
    ':' +
    dbConfig.password +
    '@localhost/' +
    dbConfig.database,
  {
    dialect: 'postgres',
    host: dbConfig.host,
    port: Number(dbConfig.port),
  }
);

sequelize.addModels(models);

async function initializeDatabase() {
  await sequelize.sync();
}
initializeDatabase();
db.sequelize = sequelize;
db.Sequelize = Sequelize;
export default db;
