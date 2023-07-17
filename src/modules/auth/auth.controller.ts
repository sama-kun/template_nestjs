import { Body, Controller, Post } from '@nestjs/common';
// import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from '@/modules/users/dto/login-user.dto';
import { Prisma } from '@prisma/client';
import { Token } from './dto/token.dto';
// import { EmailService } from 'src/email/email.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() userDto: LoginUserDto): Promise<Token> {
    return this.authService.login(userDto);
  }

  @Post('/registration')
  registration(@Body() userDto: Prisma.UserCreateInput): Promise<Token> {
    return this.authService.registration(userDto);
  }

  // @Post('/sendcode')
  // sendCode(@Body() userDto: Prisma.UserCreateInput) {
  //   return this.emailService.sendMessage(userDto);
  // }
}
