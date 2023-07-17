import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  ParseIntPipe,
  Get,
  Query,
} from '@nestjs/common';
import { BaseService } from './BaseService';
import { SearchQueryDto } from './dto/search-query.dto';
import { query } from 'express';

@Controller()
export abstract class BaseController<
  T,
  CreateDto,
  UpdateDto extends Partial<CreateDto>,
  DataService extends BaseService<T, CreateDto, UpdateDto>,
> {
  public dataService: DataService;

  @Post()
  create(@Body() data: CreateDto) {
    return this.dataService.create(data);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDto) {
    return this.dataService.update(id, data);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.dataService.findOne(id);
  }

  @Get()
  find(@Query() query: SearchQueryDto) {
    return this.dataService.findAll(query);
  }
}
