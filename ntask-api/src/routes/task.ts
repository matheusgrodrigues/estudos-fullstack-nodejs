import { Request, Response } from "express";
import TaskService from "../services/TaskService";

const taskRouter = {
   getAll: async (req: Request, res: Response) => {
      const tasks = await TaskService.getAll();
      res.json({ tasks });
   },
};

export default taskRouter;
