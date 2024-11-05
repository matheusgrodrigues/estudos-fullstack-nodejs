import express, { Router, Request, Response } from "express";
import router from "./app";

import sequelize, { Model } from "./db/config";
import Tasks from "./model/Task";
import Users from "./model/User";
import auth from "./auth";
import cors from "cors";

import morgan from "morgan";
import logger from "./lib/logs";
import helmet from "helmet";

const setupTableRelation = () => {
   Tasks.belongsTo(Users, { foreignKey: "user_id" });
   Users.hasMany(Tasks, { foreignKey: "user_id" });
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
app.use(
   morgan("common", {
      stream: {
         write: (message) => {
            logger.info(message);
         },
      },
   })
);
app.use(helmet());
app.use(
   cors({
      origin: ["http://localhost:3001"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
   })
);
app.use(express.json());
app.use(auth.initialize());
app.use(router);
app.use((req, res, next) => {
   req.body && delete req.body.id;
   next();
});

setupDatabase();

// TODO: instalar o chai e o supertest

app.listen(port, () => {
   console.log(`NTask API - porta ${port}`);
});

export { Router, Request, Response, Model };

export default app;
