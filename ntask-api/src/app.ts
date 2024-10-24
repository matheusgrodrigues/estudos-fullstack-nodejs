import { Router } from "./server";
import taskRouter from "./routes/task";

const router = Router();

router.get("/", (req, res) => {
   res.json({ tasks: "NTask API" });
});

router.get("/tasks", taskRouter.get);

export default router;
