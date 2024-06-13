import { IsString, IsEmail, IsBoolean, IsOptional, IsIn, IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    slug: string;

    @IsString()
    @IsNotEmpty()
    color: string;
}
