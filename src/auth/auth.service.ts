import { Injectable, UnauthorizedException } from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {PrismaService} from "../prisma.service";
import {HelperService} from "../helper/helper.service";
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {User} from "@prisma/client";

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private usersService: UsersService, private helper: HelperService,  private jwtService: JwtService) {}

    async signIn(email: string, pass: string): Promise<any> {
        const user: User = await this.prisma.user.findUnique({
            where:{
                email: email
            }
        });

        if(!user){
            return this.helper.responseError({
                message: 'Authentication failed',
            });
        }

        const isMatch: boolean = await bcrypt.compare(pass, user.password);

        if(!isMatch){
            return this.helper.responseError({
                message: 'Authentication failed',
            });
        }

        const payload: object = { sub: user.id };

        const accessToken: string = await this.generateToken(payload);

        return this.helper.responseSuccess({
            message: 'Authentication success',
            data: accessToken
        });
    }

    async generateToken(payload: object): Promise<string> {
        return await this.jwtService.signAsync(payload);
    }
}
