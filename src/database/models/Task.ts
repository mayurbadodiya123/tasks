import { Optional } from "sequelize";
import { Table, Model, Column } from "sequelize-typescript";

interface TaskAttributes {
  id: number;
  title: string;
  description: string;
  status: string;
}

interface TaskCreationAttributes extends Optional<TaskAttributes, "id"> {}

@Table({ tableName: "Tasks", timestamps: false, paranoid: false })
class Tasks extends Model<TaskAttributes, TaskCreationAttributes> {
  @Column({ primaryKey: true, autoIncrement: true })
  id!: number;

  @Column
  title!: string;

  @Column
  description!: string;

  @Column
  status!: string;
}

export default Tasks;
