import {IsString, IsOptional, IsNotEmpty, IsNumber} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEmblemDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    slug: string;

    @IsString()
    @IsOptional()
    image: string;

    @IsNumber()
    @IsOptional()
    category: any;
}
