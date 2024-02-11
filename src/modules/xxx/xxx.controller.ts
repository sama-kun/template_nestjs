import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Roles } from '@/modules/auth/roles-auth.decorator';
import { RolesQuard } from '@/modules/auth/roles.quard';
import { XxxService } from './xxx.service';
import { Prisma, BaseModel } from '@prisma/client';
import { BaseController } from '@/common/base/BaseController';

@Controller('xxx')
export class XxxController extends BaseController<
  BaseModel,
  Prisma.BaseModelCreateInput,
  Partial<Prisma.BaseModelCreateInput>,
  XxxService
> {
  constructor(private xxxService: XxxService) {
    super();
    this.dataService = xxxService;
  }

  // @Get('test')
  // test(){
  //   return super().
  // }
}
