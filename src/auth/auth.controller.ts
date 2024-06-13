import { Body, Controller, Post, Get, HttpCode, Res as ResHTTP, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';

import {Response} from "express";
import {PrismaService} from "../prisma.service";
import {UsersService} from "../users/users.service";
import {HelperService} from "../helper/helper.service";


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private prisma: PrismaService, private userService: UsersService, private helper: HelperService) {}
    @Post('login')
    async signIn(@Body() signInDto: SignInDto, @ResHTTP() response: Response) {
        const res =  await this.authService.signIn(signInDto.email, signInDto.password);
        return response.status(HttpStatus.OK).json(res);
    }

    @Post('register')
    async register(@Body() CreateUserDto: CreateUserDto, @ResHTTP() response: Response) {
        const res: Res =  await this.userService.create(CreateUserDto);
        const user: Res = await this.userService.findOne(+res.data);

        if(!user.data){
            return response.status(HttpStatus.FORBIDDEN).json({});
        }

        const accessToken: string = await this.authService.generateToken({sub: user.data.id});

        let responseRegister = this.helper.responseSuccess({
            message: "Authentication success",
            data: accessToken
        });

        return response.status(HttpStatus.OK).json(responseRegister);
    }
}
