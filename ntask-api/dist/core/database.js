"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = exports.DataTypes = void 0;
require("dotenv").config();
const sequelize_1 = require("sequelize");
Object.defineProperty(exports, "DataTypes", { enumerable: true, get: function () { return sequelize_1.DataTypes; } });
Object.defineProperty(exports, "Model", { enumerable: true, get: function () { return sequelize_1.Model; } });
const sequelize = new sequelize_1.Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    dialect: process.env.DB_DIALECT,
    storage: process.env.DB_STORAGE,
    define: {
        underscored: true,
    },
});
exports.default = sequelize;
