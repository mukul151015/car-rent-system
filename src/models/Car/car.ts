import { DataTypes } from 'sequelize';
import { Model, Column, Table, ForeignKey, BelongsTo, HasMany, PrimaryKey, Default } from 'sequelize-typescript';
import { User } from '../User/user';
import { Trip } from '../Trip/trip';

@Table({ tableName: 'car' })
export class Car extends Model<Car> {
  @PrimaryKey
  @Default(DataTypes.UUIDV4)
  @Column({ type: DataTypes.UUID,  allowNull: false })
  carId: string;

  @Column({ allowNull: false, type: DataTypes.STRING })
  model: string;

  @Column({ allowNull: false, type: DataTypes.DECIMAL(10, 2) })
  price: number;

  @ForeignKey(() => User)
  @Column({ allowNull: false, type: DataTypes.UUID, field: 'user_id' })
  userId: string;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Trip)
  trips: Trip[];
}
