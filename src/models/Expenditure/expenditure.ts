import { DataTypes } from 'sequelize';
import { Model, Column, Table, ForeignKey, BelongsTo, PrimaryKey, Default } from 'sequelize-typescript';
import { Trip } from '../Trip/trip';
import { v4 as uuidv4 } from 'uuid';

@Table({ tableName: 'expenditure' })
export class Expenditure extends Model<Expenditure> {
  @PrimaryKey
  @Default(uuidv4)
  @Column({ type: DataTypes.UUID, allowNull: false })
  expenditureId: string;

  @ForeignKey(() => Trip)
  @Column({ allowNull: false, type: DataTypes.UUID, field: 'trip_id' })
  tripId: string;

  @BelongsTo(() => Trip)
  trip: Trip;

  @Column({ allowNull: false, type: DataTypes.FLOAT })
  amount: number;
}
