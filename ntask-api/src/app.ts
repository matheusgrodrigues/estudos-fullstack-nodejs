import { Router } from "./server";
import taskRouter from "./routes/task";
import userRouter from "./routes/users";
import User from "./model/User";
import auth from "./auth";
import jwt from "jwt-simple";

import { config } from "./db/config";

const router = Router();

router.get("/", async (req, res) => {
   res.json({ tasks: "NTask API" });
});

router.route("/tasks").all(auth.authenticate()).get(taskRouter.findAll).post(taskRouter.create);

router
   .route("/tasks/:id")
   .all(auth.authenticate())
   .delete(taskRouter.delete)
   .get(taskRouter.findOne)
   .put(taskRouter.update);

router
   .route("/user")
   .all(auth.authenticate())
   .get(userRouter.findByID)
   .delete(userRouter.delete)
   .put(userRouter.update);

router.post("/users", userRouter.create);

router.post("/token", async (req, res) => {
   if (req.body.email && req.body.password) {
      try {
         const user = await User.findOne({ where: { email: req.body.email } });

         const isValidPassword = user && auth.isPassword(req.body.password, user.password);

         if (isValidPassword) {
            const payload = { id: user.id };

            res.json({
               token: jwt.encode(payload, config.jwtSecret!),
            });
         } else {
            res.sendStatus(401);
         }
      } catch (error) {
         res.sendStatus(401);
      }
   }
});

export default router;
