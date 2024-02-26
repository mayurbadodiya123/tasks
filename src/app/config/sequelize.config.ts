import { Sequelize } from "sequelize-typescript";
import Task from "../../database/models/Task";
import { APP_CONFIG } from "../config/app.config";

const sequelize = new Sequelize({
  host: APP_CONFIG.DATABASE.HOST,
  database: APP_CONFIG.DATABASE.NAME,
  dialect: "postgres",
  username: "postgres",
  password: APP_CONFIG.DATABASE.PASSWORD,
});

export default sequelize;
