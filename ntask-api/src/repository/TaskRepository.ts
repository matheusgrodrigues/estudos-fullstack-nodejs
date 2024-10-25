import { Model } from "../core/database";
import Tasks from "../model/Task";
import TaskSchema from "../schema/TaskSchema";

const TaskRepository = {
   findAll: async (params: object): Promise<Model<TaskSchema>[]> => {
      const tasks = await Tasks.findAll();
      return tasks;
   },
};

export default TaskRepository;
