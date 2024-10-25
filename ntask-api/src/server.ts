import express, { Router } from "express";
import router from "./app";

import sequelize from "./core/database";
import Tasks from "./model/Task";
import Users from "./model/User";

const setupTableRelation = () => {
   Tasks.belongsTo(Users);
   Users.hasMany(Tasks);
};

const syncDatabase = () =>
   sequelize
      .sync({ alter: true })
      .then(() => console.log("Banco de dados foi sincronizado."))
      .catch((err) => console.error("Erro ao sincronizar o banco de dados."));

const setupDatabase = () => {
   setupTableRelation();
   syncDatabase();
};

const app = express();
const port = 3000;

app.set("json spaces", 4);
app.set("port", port);

app.use(router);

setupDatabase();

app.listen(port, () => {
   console.log(`NTask API - porta ${port}`);
});

export { Router };

export default app;
