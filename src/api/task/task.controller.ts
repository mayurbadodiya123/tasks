import express, { Request, Response, NextFunction } from "express";
import { message } from "../../app/response/response.message";
import ResponseStatus from "../../app/response/response";
import TaskService from "./task.service";
import { NotFoundException } from "../../app/error/exception/not-found-error";
import taskValidation from "./task.validator";

class TaskController {
  public router = express.Router();
  public service = new TaskService();
  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes(): void {
    this.router.get("/list", this.getList);
    this.router.post("/create", taskValidation, this.create);

    this.router.get("/:id", this.getdetails);
    this.router.put("/:id", taskValidation, this.update);
    this.router.delete("/:id", this.delete);
  }

  getList = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const taskList = await this.service.list().then().catch();

      if (!taskList) throw new NotFoundException("Task not found");

      res.json(ResponseStatus.success(message.task.getTaskSuccess, taskList));
    } catch (error: any) {
      next(error);
    }
  };

  getdetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const teskId = req.params.id as any;

      const taskDetails = await this.service.findById(teskId).then().catch();

      if (!taskDetails) throw new NotFoundException("Task not found");

      res.json(
        ResponseStatus.success(message.task.getTaskSuccess, taskDetails)
      );
    } catch (error: any) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const taskreq = req.body;
      const task = await this.service.create(taskreq).then().catch();

      if (!task) throw new NotFoundException("Something went wrong");

      res.json(ResponseStatus.success(message.task.addTaskSuccess, task));
    } catch (error: any) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const taskReq = req.body;
      const taskId = req.params.id as any;

      const task = await this.service.findById(taskId).then().catch();

      if (!task) throw new NotFoundException("Task not found");

      await this.service.update(taskId, taskReq);

      res.json(ResponseStatus.success(message.task.updateTaskSuccess, {}));
    } catch (error: any) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const taskId = req.params.id as any;

      const taskDetails = await this.service.findById(taskId).then().catch();

      if (!taskDetails) throw new NotFoundException("Task not found");
      await this.service.delete(taskId);
      res.json(ResponseStatus.success(message.task.deleteTaskSuccess, {}));
    } catch (error: any) {
      next(error);
    }
  };
}

export default TaskController;
