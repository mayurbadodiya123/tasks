import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import { errorHandler, errorConverter } from "./app/error/error-handler";
import { ApiError } from "./app/error/exception/default-error";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import httpStatus from "http-status";
import compression from "compression";
import bodyParser from "body-parser";
import { APP_CONFIG } from "./app/config/app.config";
import TaskController from "./api/task/task.controller";

class App {
  public app: Express;

  constructor() {
    this.app = express();
  }

  public initializeMiddleware(): void {
    this.app.use(bodyParser.urlencoded({ extended: false }));

    this.app.use(express.json({ limit: "50mb" }));
    this.app.use(express.urlencoded({ extended: true, limit: "50mb" }));
    this.app.use(cookieParser());

    this.app.use(helmet());

    this.app.use(cors());
    this.app.options("*", cors);

    this.app.use(compression());

    this.app.use(function (req: Request, res: Response, next: NextFunction) {
      res.header("Content-Type", "application/json");
      next();
    });
  }

  public initializeControllers() {
    this.app.use("/api/task", new TaskController().router);
  }

  public initializeErrorMiddleware(): void {
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
    });

    // convert error to ApiError, if needed
    this.app.use(errorConverter);

    //handle error
    this.app.use(errorHandler);
  }

  public listen() {
    return this.app.listen(APP_CONFIG.PORT, () => {
      console.log(
        `⚡️[server]:: Server is running at http://localhost:${APP_CONFIG.PORT}`
      );
    });
  }
}
export default App;
