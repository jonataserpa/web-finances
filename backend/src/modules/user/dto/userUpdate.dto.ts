import { PartialType } from '@nestjs/mapped-types';
import { UserCreateDto } from './userCreate.dto';

export class UpdateModuleDto extends PartialType(UserCreateDto) {}
