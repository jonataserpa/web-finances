import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsOptional,
    IsString,
    Length,
  } from 'class-validator';
import constants from 'src/config/constants';

export class UserCreateDto {

    @ApiProperty()
    @Length(constants.STRING_MIN, constants.STRING_MAX)
    @IsString()
    name: String;

    @ApiProperty()
    @Length(constants.STRING_MIN, constants.STRING_MAX)
    @IsString()
    email: String;

    @ApiProperty()
    @Length(constants.NUMBER_MIN_PHONE)
    @IsString()
    phone_user: String;
    
    @ApiProperty()
    @IsString()
    dateborn: String;

    @ApiProperty()
    @IsString()
    radiogender: String;
}
