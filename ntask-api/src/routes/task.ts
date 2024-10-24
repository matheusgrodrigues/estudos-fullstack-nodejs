import { Request, Response } from "express";
import taskModel from "../model/task";

const taskRouter = {
   get: async (req: Request, res: Response) => {
      const tasks = await taskModel.findAll({});
      res.json(tasks);
   },
};

export default taskRouter;
