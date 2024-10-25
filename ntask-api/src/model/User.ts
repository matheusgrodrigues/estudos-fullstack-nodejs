import sequelize, { DataTypes } from "../core/database";

const Users = sequelize.define("Users", {
   id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
   },
   name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
         notEmpty: true,
      },
   },
   email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
         notEmpty: true,
      },
   },
});

export default Users;
