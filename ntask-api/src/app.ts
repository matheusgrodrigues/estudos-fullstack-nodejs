import { Router } from "./server";
import taskRouter from "./routes/task";

const router = Router();

router.get("/", async (req, res) => {
   res.json({ tasks: "NTask API" });
});

router.route("/tasks").get(taskRouter.findAll);

router
   .route("/tasks/:id")
   .delete(taskRouter.delete)
   .post(taskRouter.create)
   .get(taskRouter.findOne)
   .put(taskRouter.update);

export default router;
