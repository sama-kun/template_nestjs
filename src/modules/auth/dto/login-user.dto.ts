import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  @ApiPropertyOptional()
  email: string;

  @IsNotEmpty()
  @ApiPropertyOptional()
  password: string;
}
