import {
  Column,
  DataType,
  Model,
  Default,
  Table,
  PrimaryKey,
  AutoIncrement,
  HasMany,
} from "sequelize-typescript";
import Friend from "./friend.model";

@Table
export default class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: bigint;

  @Column(DataType.STRING(200))
  phone: string;

  @Column(DataType.STRING(20))
  name: string;

  @Default("")
  @Column(DataType.STRING(100))
  statusMessage: string;

  @HasMany(() => Friend)
  MyFriends: User[];
}
