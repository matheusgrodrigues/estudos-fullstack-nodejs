require("dotenv").config();

import { Sequelize, DataTypes, Model, Dialect } from "sequelize";

const sequelize = new Sequelize(process.env.DB_NAME!, process.env.DB_USERNAME!, process.env.DB_PASSWORD, {
   dialect: process.env.DB_DIALECT as Dialect,
   storage: process.env.DB_STORAGE,
   define: {
      underscored: true,
   },
});

export { DataTypes, Model };

export default sequelize;
