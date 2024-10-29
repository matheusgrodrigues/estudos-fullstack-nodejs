import { Request, Response } from "express";
import Tasks from "../model/Task";

const errorResponse = (error: unknown, res: Response) => {
   const { message } = error as { message: string };
   res.status(402).json({ message });
};

interface TaskRouterProps {
   findAll: (req: Request, res: Response) => Promise<void>;
   findOne: (req: Request, res: Response) => Promise<void>;
   create: (req: Request, res: Response) => Promise<void>;
   update: (req: Request, res: Response) => Promise<void>;
   delete: (req: Request, res: Response) => Promise<void>;
}

// TODO: validar para pegar os dados do usuario autenticado -> PG 90
const taskRouter: TaskRouterProps = {
   findAll: async (req, res) => {
      try {
         const result = await Tasks.findAll();
         res.json({ tasks: result }).status(200);
      } catch (error) {
         errorResponse(error, res);
      }
   },
   findOne: async (req, res) => {
      try {
         const result = await Tasks.findOne({ where: req.params });
         result !== undefined ? res.json(result) : res.sendStatus(404);
      } catch (error) {
         errorResponse(error, res);
      }
   },
   create: async (req, res) => {
      try {
         const result = await Tasks.create(req.body);
         res.json(result);
      } catch (error) {
         errorResponse(error, res);
      }
   },
   update: async (req, res) => {
      try {
         await Tasks.update(req.body, { where: req.params });
         res.sendStatus(204);
      } catch (error) {
         errorResponse(error, res);
      }
   },
   delete: async (req, res) => {
      try {
         await Tasks.destroy({ where: req.params });
         res.sendStatus(204);
      } catch (error) {
         errorResponse(error, res);
      }
   },
};

export default taskRouter;
