import { IsString, IsEmail, IsBoolean, IsOptional, IsIn, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class SignInDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
