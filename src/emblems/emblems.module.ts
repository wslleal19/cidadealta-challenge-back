import { Module } from '@nestjs/common';
import { EmblemsService } from './emblems.service';
import { EmblemsController } from './emblems.controller';
import {PrismaService} from "../prisma.service";
import {HelperService} from "../helper/helper.service";

@Module({
  controllers: [EmblemsController],
  providers: [EmblemsService, PrismaService, HelperService],
})
export class EmblemsModule {}
