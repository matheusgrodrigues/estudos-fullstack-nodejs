import sequelize, { DataTypes, Model, Optional } from "../core/database";
import UserSchema from "../schema/UserSchema";
import bcrypt from "bcrypt";

class User extends Model<UserSchema, Optional<UserSchema, "id">> {
   public id!: number;
   public name!: string;
   public email!: string;
   public password!: string;
}

User.init(
   {
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
      password: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            notEmpty: true,
         },
         set(value) {
            const salt = bcrypt.genSaltSync();
            const password = bcrypt.hashSync(value as string, salt);
            this.setDataValue("password", password);
         },
      },
   },
   {
      sequelize,
      modelName: "User",
      tableName: "Users",
   }
);

export default User;
