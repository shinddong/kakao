import {
  AutoIncrement,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import Chat from "./chat.model";
import User from "./user.model";
@Table
export default class Message extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: bigint;

  @Column
  @ForeignKey(() => User)
  senderId: bigint;

  @Column
  @ForeignKey(() => Chat)
  chatId: bigint;

  @Column(DataType.STRING(2048))
  message: string;

  @Column(DataType.BOOLEAN)
  isRead: boolean;
}
