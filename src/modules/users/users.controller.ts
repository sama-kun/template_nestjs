import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Roles } from '@/modules/auth/roles-auth.decorator';
import { RolesQuard } from '@/modules/auth/roles.quard';
import { UserService } from './users.service';
import { Prisma } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  // @Get('/test')
  // async test() {
  //   return 'ok';
  // }

  @Post()
  async create(@Body() userDto: Prisma.UserCreateInput) {
    const user = this.userService.create(userDto);
    return user;
  }

  @UseGuards(RolesQuard)
  @Get()
  @Roles('ADMIN')
  async getAll() {
    return await this.userService.getAll();
  }

  // @UseGuards(RolesQuard)
  // @Roles('ADMIN')
  // @Get('/:id')
  // async getOne(@Param('id') id: string) {
  //   return await this.userService.findById(id);
  // }
}
