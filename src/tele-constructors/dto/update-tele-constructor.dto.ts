import { PartialType } from '@nestjs/mapped-types';
import { CreateTeleConstructorDto } from './create-tele-constructor.dto';

export class UpdateTeleConstructorDto extends PartialType(CreateTeleConstructorDto) {}
