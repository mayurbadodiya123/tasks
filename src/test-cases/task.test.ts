import { NextFunction, Request, Response } from "express";
import TaskController from "./../api/task/task.controller";
import TaskService from "./../api/task/task.service";
import { NotFoundException } from "./../app/error/exception/not-found-error";

// Importing 'message' and 'ResponseStatus' is not provided in the code you shared
// You should import them if they are defined in your project

jest.mock("../api/task/task.service");

const mockedTaskService = TaskService as jest.Mocked<typeof TaskService>;

describe("TaskController", () => {
  let taskController: TaskController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: jest.Mock<NextFunction>;

  beforeEach(() => {
    taskController = new TaskController();
    mockRequest = {};
    mockResponse = { json: jest.fn() };
    mockNext = jest.fn();
  });

  describe("getAllTasks", () => {
    it("should respond with an array of tasks", async () => {
      // Mock the list method of TaskService
      (mockedTaskService.prototype.list as any).mockResolvedValue({});

      // Call the getList method with the mocked objects
      await taskController.getList(
        mockRequest as Request,
        mockResponse as Response,
        mockNext as NextFunction
      );

      expect(mockedTaskService.prototype.list).toHaveBeenCalled();
      expect(mockResponse.json).toHaveBeenCalledWith({
        setting: {
          message: "Task details found",
          status: 200,
        },
        data: [],
      });
      expect(mockNext).not.toHaveBeenCalled(); // Assuming no error is thrown
    });
  });
});
