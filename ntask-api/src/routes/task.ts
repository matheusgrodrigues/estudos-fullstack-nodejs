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

const taskRouter: TaskRouterProps = {
   findAll: async (req, res) => {
      const user = req.user as { id: number } & typeof req.user;

      try {
         const result = await Tasks.findAll({ where: { user_id: user.id } });

         res.json({ tasks: result }).status(200);
      } catch (error) {
         errorResponse(error, res);
      }
   },
   findOne: async (req, res) => {
      const user = req.user as { id: number } & typeof req.user;

      try {
         const result = await Tasks.findOne({
            where: {
               id: req.params.id,
               user_id: user.id,
            },
         });
         result !== undefined ? res.json(result) : res.sendStatus(404);
      } catch (error) {
         errorResponse(error, res);
      }
   },
   create: async (req, res) => {
      const user = req.user as { id: number } & typeof req.user;

      req.body.user_id = user.id;

      try {
         const result = await Tasks.create(req.body);
         res.json(result);
      } catch (error) {
         errorResponse(error, res);
      }
   },
   update: async (req, res) => {
      const user = req.user as { id: number } & typeof req.user;

      try {
         await Tasks.update(req.body, {
            where: {
               id: req.params.id,
               user_id: user.id,
            },
         });
         res.sendStatus(204);
      } catch (error) {
         errorResponse(error, res);
      }
   },
   delete: async (req, res) => {
      const user = req.user as { id: number } & typeof req.user;

      try {
         await Tasks.destroy({ where: { id: req.params.id, user_id: user.id } });
         res.sendStatus(204);
      } catch (error) {
         errorResponse(error, res);
      }
   },
};

export default taskRouter;
