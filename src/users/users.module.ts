import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {PrismaService} from "../prisma.service";
import {HelperService} from "../helper/helper.service";

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, HelperService],
})
export class UsersModule {}
