import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {PrismaService} from "../prisma.service";
import {HelperService} from "../helper/helper.service";
import slugify from "slugify";
import {Category, Emblem} from "@prisma/client";


@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService, private helper: HelperService){}

  async create(data: CreateCategoryDto): Promise<Res> {
    if(await this.prisma.category.findFirst({ where: { name: data.name } })){
      return this.helper.responseError({
        message: 'Category already exists',
      });
    }

    data.slug = slugify(data.name);

    const categoryCreated: Category = await this.prisma.category.create({
      data,
    });

    return this.helper.responseSuccess({
      message: 'Category created successfully.',
      data: categoryCreated.id
    });
  }

  async findAll(): Promise<Res> {
    const categories = await this.prisma.category.findMany({})

    return this.helper.responseSuccess({
      message: 'Categories list',
      data: categories
    });
  }

  async findOne(id: number): Promise<Res> {
    const category: object | null = await this.prisma.category.findUnique({
      where: {
        id,
      },
    });

    if(!category){
      return this.helper.responseError({
        message: 'Category not found',
      });
    }

    return this.helper.responseSuccess({
      message: 'Category details',
      data: category
    });
  }

  async update(id: number, data: UpdateCategoryDto): Promise<Res> {
    if(!await this.verifyCategoryExistsById(id)){
      return this.helper.responseError({
        message: 'Category not found',
      });
    }

    if(data.name){
      data.slug = slugify(data.name);
    }

    await this.prisma.category.update({
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
    if(!await this.verifyCategoryExistsById(id)){
      return this.helper.responseError({
        message: 'Category not found',
      });
    }

    await this.prisma.category.delete({
      where: {
        id
      },
    });

    return this.helper.responseSuccess({
      message: 'Category removed successfully.',
    });
  }

  async verifyCategoryExistsById(id: number): Promise<boolean>{
    const category: Category = await this.prisma.category.findUnique({ where: { id } });

    return !!category;
  }
}
