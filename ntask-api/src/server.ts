import express, { Router, Request, Response } from "express";
import router from "./app";

import sequelize, { Model } from "./core/database";
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

app.use(express.json());
app.use(router);
app.use((req, res, next) => {
   req.body && delete req.body.id;
   next();
});

setupDatabase();

app.listen(port, () => {
   console.log(`NTask API - porta ${port}`);
});

export { Router, Request, Response, Model };

export default app;
