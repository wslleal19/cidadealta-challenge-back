import { PartialType } from '@nestjs/mapped-types';
import { CreateEmblemDto } from './create-emblem.dto';

export class UpdateEmblemDto extends PartialType(CreateEmblemDto) {}
