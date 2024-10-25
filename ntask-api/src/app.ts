import { Router } from "./server";
import taskRouter from "./routes/task";

const router = Router();

router.get("/", async (req, res) => {
   res.json({ tasks: "NTask API" });
});

router.get("/tasks", taskRouter.getAll);

export default router;
