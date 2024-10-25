import { Model } from "../core/database";
import TaskSchema from "../schema/TaskSchema";
import Tasks from "../model/Task";

const TaskRepository = {
   findAll: async (params: object): Promise<Model<TaskSchema>[]> => {
      const tasks = await Tasks.findAll();
      return tasks;
   },
};

export default TaskRepository;
