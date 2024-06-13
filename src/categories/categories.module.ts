import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import {PrismaService} from "../prisma.service";
import {HelperService} from "../helper/helper.service";

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, PrismaService, HelperService],
})
export class CategoriesModule {}
