import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { PrismaService } from '@/database/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    console.log(user);

    return user;
  }

  // async findById(id: string): Promise<User> {
  //   const user = await this.userRepository
  //     .findById(id)
  //     .select('-password')
  //     .exec();
  //   console.log(user);
  //   return user;
  // }

  async create(userDto: Prisma.UserCreateInput): Promise<User> {
    try {
      const user = await this.prisma.user.create({ data: userDto });
      delete user.password;
      return user;
    } catch (error) {
      console.error(error);
      throw new BadRequestException(error.message);
    }
  }

  async getAll(): Promise<Prisma.UserCreateInput[]> {
    const users = await this.prisma.user.findMany();
    console.log(users);
    return users;
  }

  // getRoleByName(role: string): string {
  //   return Roles[role];
  // }
}
