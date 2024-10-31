import sequelize, { DataTypes } from "../db/config";

const Tasks = sequelize.define("Tasks", {
   id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
   },
   title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
         notEmpty: true,
      },
   },
   done: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
   },
   user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
         model: "User",
         key: "id",
      },
   },
});

export default Tasks;
