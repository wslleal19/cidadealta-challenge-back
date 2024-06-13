import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User, Prisma } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SaveEmblemDto } from './dto/save-emblem.dto';
import * as bcrypt from 'bcrypt';
import {HelperService} from "../helper/helper.service";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService, private helper: HelperService){}

  // Promise<User>
  async create(data: CreateUserDto): Promise<Res>  {
     if(await this.prisma.user.findUnique({ where: { email: data.email } })){
          return this.helper.responseError({
              message: 'User e-mail already exists',
          });
     }

     data.password = await bcrypt.hash(data.password, 12);

     if(!data.role){
       data.role = 'user';
     }

     // Somente usuários que já são admin podem criar outros usuários admin.
     if(data.role === 'admin'){
        //     Verificar se o usuário está logado e verificar se tem a role admin
     }

     const userCreated: User = await this.prisma.user.create({
        data,
     });

     return this.helper.responseSuccess({
         message: 'User created successfully.',
         data: userCreated.id
     });
  }

  async findAll(): Promise<Res> {
      const users = await this.prisma.user.findMany({
          select: {
              id: true,
              name: true,
              email: true,
              image: true,
              role: true,
              active: true,
              user_emblems: true,
              created_at: true,
              updated_at: true,
              last_login: true
          },
      })

      return this.helper.responseSuccess({
          message: 'Users list',
          data: users
      });
  }

  async findOne(id: number): Promise<Res> {
      const user: object | null = await this.prisma.user.findUnique({
          where: {
              id,
          },
          select: {
              id: true,
              name: true,
              email: true,
              image: true,
              role: true,
              active: true,
              user_emblems: true,
              created_at: true,
              updated_at: true,
              last_login: true
          },
      });

      if(!user){
          return this.helper.responseError({
              message: 'User not found',
          });
      }

      return this.helper.responseSuccess({
            message: 'User details',
            data: user
      });
  }

  async update(id: number, data: UpdateUserDto): Promise<Res> {
      if(!await this.verifyUserExistsById(id)){
          return this.helper.responseError({
              message: 'User not found',
          });
      }

      if(data.password && typeof data.password === 'string'){
          data.password = await bcrypt.hash(data.password, 12);
      }

      await this.prisma.user.update({
          where: {
              id
          },
          data,
      })

      return this.helper.responseSuccess({
          message: 'User updated successfully.',
      });
  }

  async remove(id: number): Promise<Res> {
      if(!await this.verifyUserExistsById(id)){
          return this.helper.responseError({
              message: 'User not found',
          });
      }

      await this.prisma.user.delete({
          where: {
              id
          },
      });

      return this.helper.responseSuccess({
          message: 'User removed successfully.',
      });
  }


  async saveEmblem(userId: number, saveEmblemDto: SaveEmblemDto): Promise<Res>{
      if(!await this.verifyUserExistsById(userId)){
          return this.helper.responseError({
              message: 'User not found',
          });
      }

      if (!await this.prisma.emblem.findUnique({ where: { id: saveEmblemDto.emblem_id } })) {
          return this.helper.responseError({
              message: 'Emblem not found',
          });
      }

      if (await this.prisma.userEmblems.findFirst({ where: { user_id: userId, emblem_id: saveEmblemDto.emblem_id  } })) {
          return this.helper.responseError({
              message: 'This user already has this emblem',
          });
      }

      await this.prisma.userEmblems.create({
          data: {
              user_id: userId,
              emblem_id: saveEmblemDto.emblem_id,
              date_awarded: new Date(),
          },
      });

      return this.helper.responseSuccess({
          message: 'Emblem saved successfully.',
      });
  }

  async verifyUserExistsById(id: number): Promise<boolean>{
      const user: User = await this.prisma.user.findUnique({ where: { id } });

      return !!user;
  }

}
