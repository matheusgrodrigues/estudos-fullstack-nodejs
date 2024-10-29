import { Request, Response } from "express";
import User from "../model/User";

const errorResponse = (error: unknown, res: Response) => {
   const { message } = error as { message: string };
   res.status(402).json({ message });
};

interface UserRouterProps {
   findByID: (req: Request, res: Response) => Promise<void>;
   create: (req: Request, res: Response) => Promise<void>;
   update: (req: Request, res: Response) => Promise<void>;
   delete: (req: Request, res: Response) => Promise<void>;
}

const userRouter: UserRouterProps = {
   findByID: async (req, res) => {
      try {
         const result = await User.findByPk(req.params.id, {
            attributes: ["id", "name", "email"],
         });
         result !== undefined ? res.json(result) : res.sendStatus(404);
      } catch (error) {
         errorResponse(error, res);
      }
   },
   create: async (req, res) => {
      try {
         const result = await User.create(req.body);
         res.json(result);
      } catch (error) {
         errorResponse(error, res);
      }
   },
   update: async (req, res) => {
      try {
         await User.update(req.body, { where: { id: req.params.id } });
         res.sendStatus(204);
      } catch (error) {
         errorResponse(error, res);
      }
   },
   delete: async (req, res) => {
      try {
         await User.destroy({ where: { id: req.params.id } });
         res.sendStatus(204);
      } catch (error) {
         errorResponse(error, res);
      }
   },
};

export default userRouter;
