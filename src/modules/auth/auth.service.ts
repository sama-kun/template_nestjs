import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@/modules/users/users.service';
import * as bcrypt from 'bcryptjs';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { Prisma, User } from '@prisma/client';
import { Token } from './dto/token.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginUserDto): Promise<Token> {
    const user = await this.validateUser(dto);
    delete user.password;
    return {
      accessToken: this.generateToken(user),
      user,
    };
  }

  async registration(dto: Prisma.UserCreateInput): Promise<Token> {
    const candidate = await this.userService.findByEmail(dto.email);
    console.log(candidate);

    if (candidate) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }
    const hash = await bcrypt.hash(dto.password, 5);
    const user = await this.userService.create({ ...dto, password: hash });
    return {
      accessToken: this.generateToken(user),
      user,
    };
  }

  private generateToken(user: User): string {
    const payload = { email: user.email, id: user.id, role: user.role };
    console.log(user);
    return this.jwtService.sign(payload);
  }

  private async validateUser(userDto: LoginUserDto): Promise<User> {
    //console.log(userDto);
    const user = await this.userService.findByEmail(userDto.email);
    //console.log(user);
    const passwordCheck = await bcrypt.compare(userDto.password, user.password);

    if (passwordCheck && user) {
      return user;
    }

    throw new UnauthorizedException({ message: 'Incorrect password or email' });
  }
}
