import { passwordHash } from '@app/common';
import { Model } from 'sequelize';
import { Column, PrimaryKey, Table, BeforeCreate } from 'sequelize-typescript';

@Table({ tableName: 'users', paranoid: true })
export class User extends Model {
  @PrimaryKey
  @Column({ autoIncrement: true })
  id: number;

  @Column
  email: string;

  @Column
  password: string;

  @Column
  name: string;

  @Column
  phone: string;

  @Column({ field: 'created_at' })
  createdAt: Date;

  @Column({ field: 'updated_at' })
  updatedAt: Date;

  @Column({ field: 'deleted_at' })
  deletedAt: Date;

  @BeforeCreate
  static async hashPassword(user: User): Promise<void> {
    user.password = await passwordHash(user.password);
  }
}
