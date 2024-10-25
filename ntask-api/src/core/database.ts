import { Sequelize, DataTypes, Model } from "sequelize";

import config from "../config/database";

const { database, username, password, params } = config;

const sequelize = new Sequelize(database, username, password, params);

export { DataTypes, Model };

export default sequelize;
