import data, { TaskSchema } from "../data/data";

const taskModel = {
   findAll: async (params: object): Promise<TaskSchema[]> => data.tasks,
};

export default taskModel;
