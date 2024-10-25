import TaskRepository from "../repository/TaskRepository";

const TaskService = {
   getAll: async () => {
      const tasks = await TaskRepository.findAll({});
      return tasks;
   },
};

export default TaskService;
