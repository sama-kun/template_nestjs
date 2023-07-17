import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseModel, Prisma, Role } from '@prisma/client';
import { PrismaService } from '@/database/prisma.service';
import { User } from '@prisma/client';
import { BaseService } from '@/common/base/BaseService';

@Injectable()
export class XxxService extends BaseService<
  BaseModel,
  Prisma.BaseModelCreateInput,
  Partial<Prisma.BaseModelCreateInput>
> {
  protected readonly model = Prisma.ModelName.BaseModel;
  constructor(prisma: PrismaService) {
    super();
    this.prisma = prisma;
  }
  // test(){
  //   return super().
  // }
}
