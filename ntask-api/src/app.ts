import { Router } from "./server";
import taskRouter from "./routes/task";
import userRouter from "./routes/users";

const router = Router();

router.get("/", async (req, res) => {
   res.json({ tasks: "NTask API" });
});

router.route("/tasks").get(taskRouter.findAll).post(taskRouter.create);
router.route("/tasks/:id").delete(taskRouter.delete).get(taskRouter.findOne).put(taskRouter.update);

router.get("/users/:id", userRouter.findByID);
router.delete("/users/:id", userRouter.delete);
router.post("/users", userRouter.create);
router.put("/users/:id", userRouter.update);

export default router;
