import { IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

export class GetUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  surname: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  phone: string;

  bank: number;

  roles?: string[] | string;
}
