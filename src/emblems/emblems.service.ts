import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {Emblem, Prisma, User} from '@prisma/client';
import { CreateEmblemDto } from './dto/create-emblem.dto';
import { UpdateEmblemDto } from './dto/update-emblem.dto';
import {HelperService} from "../helper/helper.service";
import slugify from "slugify";

@Injectable()
export class EmblemsService {
  constructor(private prisma: PrismaService, private helper: HelperService){}

  async create(data: CreateEmblemDto): Promise<Res> {
    if(await this.prisma.emblem.findFirst({ where: { name: data.name } })){
      return this.helper.responseError({
        message: 'Emblem name already exists',
      });
    }

    if(data.category){
      let category: number = data.category;
      data.category = {
        connect: {
          id: category
        }
      }
    }

    data.slug = slugify(data.name);

    const emblemCreated: Emblem = await this.prisma.emblem.create({
      data,
    });

    return this.helper.responseSuccess({
      message: 'Emblem created successfully.',
      data: emblemCreated.id
    });
  }

  async findAll(): Promise<Res> {
    const emblems = await this.prisma.emblem.findMany({
      include:{
        category: true
      }
    })

    return this.helper.responseSuccess({
      message: 'Emblems list',
      data: emblems
    });
  }

  async findOne(id: number): Promise<Res> {
    const emblem: object | null = await this.prisma.emblem.findUnique({
      where: {
        id,
      },
      include:{
        category: true
      }
    });

    if(!emblem){
      return this.helper.responseError({
        message: 'Emblem not found',
      });
    }

    return this.helper.responseSuccess({
      message: 'Emblem details',
      data: emblem
    });
  }

  async update(id: number, data: UpdateEmblemDto): Promise<Res> {
    if(!await this.verifyEmblemExistsById(id)){
        return this.helper.responseError({
          message: 'Emblem not found',
        });
    }

    if(data.category){
      let category: number = data.category;
      data.category = {
        connect: {
          id: category
        }
      }
    }

    if(data.name){
      data.slug = slugify(data.name);
    }

    await this.prisma.emblem.update({
      where: {
        id
      },
      data,
    });

    return this.helper.responseSuccess({
      message: 'Emblem updated successfully.',
    });
  }

  async remove(id: number): Promise<Res> {
    if(!await this.verifyEmblemExistsById(id)){
      return this.helper.responseError({
        message: 'Emblem not found',
      });
    }

    await this.prisma.emblem.delete({
      where: {
        id
      },
    });

    return this.helper.responseSuccess({
      message: 'Emblem removed successfully.',
    });
  }

  async verifyEmblemExistsById(id: number): Promise<boolean>{
    const emblem: Emblem = await this.prisma.emblem.findUnique({ where: { id } });

    return !!emblem;
  }

}
