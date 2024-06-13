import {Controller, Get, Post, Body, Patch, Res as ResHTTP, Param, Delete, HttpStatus} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {Response} from "express";

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto, @ResHTTP() response: Response) {
    const res: Res =  await this.categoriesService.create(createCategoryDto);
    return response.status(HttpStatus.OK).json(res);
  }

  @Get()
  async findAll(@ResHTTP() response: Response) {
    const res: Res =  await this.categoriesService.findAll();
    return response.status(HttpStatus.OK).json(res);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @ResHTTP() response: Response) {
    const res: Res =  await this.categoriesService.findOne(+id);
    return response.status(HttpStatus.OK).json(res);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto, @ResHTTP() response: Response) {
    const res: Res =  await this.categoriesService.update(+id, updateCategoryDto);
    return response.status(HttpStatus.OK).json(res);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @ResHTTP() response: Response) {
    const res: Res = await this.categoriesService.remove(+id);
    return response.status(HttpStatus.OK).json(res);
  }
}
