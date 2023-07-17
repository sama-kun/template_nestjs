import { PrismaService } from '@/database/prisma.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaClientInitializationError } from '@prisma/client/runtime/library';
import { SearchQueryDto } from './dto/search-query.dto';

export abstract class BaseService<T, CreateDto, UpdateDto> {
  protected prisma: PrismaService;

  // constructor() {
  //   this.prisma = new PrismaClient().user;
  // }
  protected abstract readonly model: Prisma.ModelName;

  async create(data: CreateDto): Promise<T> {
    try {
      return this.prisma[this.model].create({ data });
    } catch (e) {
      throw new HttpException(
        'Error creating record',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, data: UpdateDto): Promise<UpdateDto> {
    try {
      const record = this.prisma[this.model].findById(id);
      console.log(record);
      if (!record)
        throw new PrismaClientInitializationError('Error updating record', '');
      const updated = this.prisma[this.model].update({ where: { id }, data });
      return updated;
    } catch (e) {
      throw new HttpException('Record not found1', HttpStatus.NOT_FOUND);
      // throw new HttpException(
      //   'Error updating record',
      //   HttpStatus.INTERNAL_SERVER_ERROR,
      // );
    }
  }

  async findOne(id: number): Promise<UpdateDto> {
    try {
      const record = this.prisma[this.model].findById(id);
      if (!record)
        throw new HttpException('Record not found', HttpStatus.NOT_FOUND);
      delete record.password;
      return record;
    } catch (e) {
      throw new PrismaClientInitializationError('Error updating record', '');
    }
  }
  async findAll(query: SearchQueryDto): Promise<any> {
    const { pagination } = query;
    const { page, pageSize } = pagination;
    const records = await this.prisma[this.model].findAll({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    const total = await this.prisma[this.model].count();
    const meta = this.createMeta(page, pageSize, total);

    return {
      users: records,
      meta,
    };
  }

  private createMeta(page, pageSize, total) {
    const meta = {
      page,
      pageSize,
      pageCount: Math.ceil(total / pageSize),
      total,
    };
    return meta;
  }
}
