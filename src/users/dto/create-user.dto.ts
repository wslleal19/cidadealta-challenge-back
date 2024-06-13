import { IsString, IsEmail, IsBoolean, IsOptional, IsIn, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsOptional()
    image: string;

    @IsString()
    @IsOptional()
    @IsIn(['admin', 'user'])
    role: string;

    @IsBoolean()
    @IsOptional()
    active: boolean;
}
