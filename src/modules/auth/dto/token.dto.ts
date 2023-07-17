import { Prisma, User } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class Token {
  @IsNotEmpty()
  @IsString()
  accessToken: string;

  @IsNotEmpty()
  user: Partial<Prisma.UserCreateInput>;
}
