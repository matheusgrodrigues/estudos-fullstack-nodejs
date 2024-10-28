import { Request, Response } from "express";
import Users from "../model/User";

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
         const result = await Users.findByPk(req.params.id, {
            attributes: ["id", "name", "email"],
         });
         result !== undefined ? res.json(result) : res.sendStatus(404);
      } catch (error) {
         errorResponse(error, res);
      }
   },
   create: async (req, res) => {
      try {
         const result = await Users.create(req.body);
         res.json(result);
      } catch (error) {
         errorResponse(error, res);
      }
   },
   update: async (req, res) => {
      try {
         await Users.update(req.body, { where: { id: req.params.id } });
         res.sendStatus(204);
      } catch (error) {
         errorResponse(error, res);
      }
   },
   delete: async (req, res) => {
      try {
         await Users.destroy({ where: { id: req.params.id } });
         res.sendStatus(204);
      } catch (error) {
         errorResponse(error, res);
      }
   },
};

export default userRouter;
