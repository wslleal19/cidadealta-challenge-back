import { Controller, Get, Post, Body, Patch, Param, Res as ResHTTP, Delete, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SaveEmblemDto } from './dto/save-emblem.dto';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @ResHTTP() response: Response) {
    const res: Res = await this.usersService.create(createUserDto);
    return response.status(HttpStatus.OK).json(res);
  }

  @Get()
  async findAll(@ResHTTP() response: Response) {
    const res: Res = await this.usersService.findAll();
    return response.status(HttpStatus.OK).json(res);
  }

  @Get(':id')
  async findOne(@Param('id') id: number, @ResHTTP() response: Response) {
    const res: Res = await this.usersService.findOne(+id);
    return response.status(HttpStatus.OK).json(res);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @ResHTTP() response: Response) {
    const res: Res = await this.usersService.update(+id, updateUserDto);
    return response.status(HttpStatus.OK).json(res);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @ResHTTP() response: Response) {
    const res: Res = await this.usersService.remove(+id);
    return response.status(HttpStatus.OK).json(res);
  }

  @Post(':id/emblem')
  async saveEmblem(@Param('id') id: string, @Body() saveEmblemDto: SaveEmblemDto, @ResHTTP() response: Response) {
    const res: any = await this.usersService.saveEmblem(+id, saveEmblemDto);
    return response.status(HttpStatus.OK).json(res);
  }

}
