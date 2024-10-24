import express, { Router } from "express";
import router from "./app";

const app = express();
const port = 3000;

app.set("json spaces", 4);
app.set("port", port);

app.use(router);

app.listen(port, () => console.log(`NTask API - porta ${port}`));

export { Router };

export default app;
