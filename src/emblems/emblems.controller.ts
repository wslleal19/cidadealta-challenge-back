import {Controller, Get, Post, Body, Patch, Param, Delete, Res as ResHTTP, HttpStatus} from '@nestjs/common';
import { EmblemsService } from './emblems.service';
import { CreateEmblemDto } from './dto/create-emblem.dto';
import { UpdateEmblemDto } from './dto/update-emblem.dto';
import {Response} from "express";

@Controller('emblems')
export class EmblemsController {
  constructor(private readonly emblemsService: EmblemsService) {}

  @Post()
  async create(@Body() createEmblemDto: CreateEmblemDto, @ResHTTP() response: Response) {
    const res: Res = await this.emblemsService.create(createEmblemDto);
    return response.status(HttpStatus.OK).json(res);
  }

  @Get()
  async findAll(@ResHTTP() response: Response) {
    const res: Res = await this.emblemsService.findAll();
    return response.status(HttpStatus.OK).json(res);

  }

  @Get(':id')
  async findOne(@Param('id') id: string, @ResHTTP() @ResHTTP() response: Response) {
    const res: Res = await this.emblemsService.findOne(+id);
    return response.status(HttpStatus.OK).json(res);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateEmblemDto: UpdateEmblemDto, @ResHTTP() response: Response) {
    const res: Res = await this.emblemsService.update(+id, updateEmblemDto);
    return response.status(HttpStatus.OK).json(res);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @ResHTTP() response: Response) {
    const res: Res = await this.emblemsService.remove(+id);
    return response.status(HttpStatus.OK).json(res);
  }
}
