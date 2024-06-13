import { IsInt } from 'class-validator';

export class SaveEmblemDto {
    @IsInt()
    emblem_id: number;
}