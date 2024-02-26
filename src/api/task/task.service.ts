import Task from "../../database/models/Task";
import sequelize from "../../app/config/sequelize.config";

class TaskService {
  public sq = sequelize;
  constructor() {
    this.sq.addModels([Task]);
  }

  async list(): Promise<Task[]> {
    return Task.findAll();
  }

  async create(data: Task): Promise<Task> {
    return Task.create(data);
  }

  async update(id: number | string, data: Task): Promise<any> {
    return Task.update(data, { where: { id } });
  }

  async findById(id: number | string): Promise<any> {
    return Task.findOne({ where: { id } });
  }

  async delete(id: number | string): Promise<any> {
    return Task.destroy({ where: { id } });
  }
}

export default TaskService;
