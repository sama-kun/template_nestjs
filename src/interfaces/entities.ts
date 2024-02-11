import { RoleEnum } from './enums';

export interface IBaseModel {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUser extends IBaseModel {
  email: string;
  password: string;
  role: RoleEnum;
}
