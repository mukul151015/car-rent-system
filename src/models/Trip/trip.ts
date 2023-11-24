import { DataTypes } from 'sequelize';
import { Model, Column, Table, ForeignKey, BelongsTo, Default, PrimaryKey } from 'sequelize-typescript';
import { Car } from '../Car/car';
import { v4 as uuidv4 } from 'uuid';

@Table({ tableName: 'trip' })
export class Trip extends Model<Trip> {
  @PrimaryKey
  @Default(uuidv4)
  @Column({ type: DataTypes.UUID, allowNull: false })
  tripId: string;

  @Column({ allowNull: false, type: DataTypes.STRING })  
  destination: string;

  @Column({ allowNull: false, type: DataTypes.FLOAT })
  distance: number;

  @ForeignKey(() => Car)
  @Column({ allowNull: false, type: DataTypes.UUID, field: 'car_id' })  
  carId: string;  

  @BelongsTo(() => Car)
  car: Car;
}
