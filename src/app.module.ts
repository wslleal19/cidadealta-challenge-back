import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import {PrismaService} from "./prisma.service";
import { HelperService } from './helper/helper.service';
import { EmblemsModule } from './emblems/emblems.module';
import { CategoriesModule } from './categories/categories.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, EmblemsModule, CategoriesModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, HelperService],
})
export class AppModule {}
