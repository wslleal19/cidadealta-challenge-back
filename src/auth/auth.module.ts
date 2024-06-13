
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';
import {PrismaService} from "../prisma.service";
import {HelperService} from "../helper/helper.service";
import {UsersService} from "../users/users.service";

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [AuthService, PrismaService, HelperService, UsersService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}