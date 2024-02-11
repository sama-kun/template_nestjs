import { Entity, Column } from 'typeorm';
import { RoleEnum } from '@/interfaces/enums';
import { BaseModel } from '@/common/base/BaseModel';
import { IUser } from '@/interfaces/entities';

@Entity('user')
export class UserEntity extends BaseModel implements IUser {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: RoleEnum.USER })
  role: RoleEnum;
}
