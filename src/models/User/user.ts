import { DataTypes } from 'sequelize';
import {
  Model,
  Column,
  Table,
  PrimaryKey,
  Default,
  HasMany,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import { Car } from '../Car/car';

@Table({ tableName: 'user' })
export class User extends Model<User> {
  @PrimaryKey
  @Default(uuidv4)
  @Column({ type: DataTypes.UUID, allowNull: false, field: 'user_id' })
  userId: string;

  @Column({ allowNull: false, type: DataTypes.STRING })
  username: string;

  @Column({ type: DataTypes.BOOLEAN, field: 'is_active', defaultValue: false })
  isActive: boolean;

  @Column({
    allowNull: true,
    type: DataTypes.DATE,
    field: 'deleted_at',
  })
  deletedAt: Date;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
    field: 'residence',
  })
  residence: string;

  @Column({ allowNull: false, type: DataTypes.STRING })
  password: string;

  @Column({ type: DataTypes.TEXT })
  phone: DataTypes.TextDataType;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataTypes.ENUM(
      'ADMIN',
      'FEEDBACK_AGENT',
      'SUB_ADMIN',
      'AREA_MANAGER',
      'OEM',
      'DEALER',
      'EMPLOYEE'
    ),
    defaultValue: 'ADMIN',
  })
  role: string;


  @HasMany(() => Car)
  cars: Car[];
}
