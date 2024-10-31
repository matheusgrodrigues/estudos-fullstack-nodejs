require("dotenv").config();

import { Sequelize, DataTypes, Model, Dialect, Optional } from "sequelize";

export const config = {
   database: {
      name: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      define: {
         underscored: true,
      },
   },

   jwtSecret: process.env.JWT_SECRET,
   jwtSession: { session: false },
};

const { name, username, password, define } = config.database;

const sequelize = new Sequelize(name!, username!, password, {
   dialect: process.env.DB_DIALECT as Dialect,
   storage: process.env.DB_STORAGE,
   logging: Boolean(process.env.DB_LOGGING),
   define: {
      underscored: define.underscored,
   },
});

export { DataTypes, Model, Optional };

export default sequelize;
