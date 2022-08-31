import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import accessProfileConstants from 'src/config/constants/accessProfile.constants';
import { AccessControl } from 'src/utils/decorators/accessControl.decorator';
import { UserCreateDto } from '../dto/userCreate.dto';
import { UpdateModuleDto } from '../dto/userUpdate.dto';
import { UserService } from '../services/module.service';

@ApiTags('user')
@Controller('user')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly moduleService: UserService) {}

  @Post()
  @AccessControl(accessProfileConstants.PERMISSIONS.CREATE_USER)
  @ApiOperation({ summary: 'User register' })
  @ApiCreatedResponse({
    description: 'User created',
    type: UserCreateDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiBody({ type: UserCreateDto })
  create(@Body() createModuleDto: UserCreateDto) {
    return this.moduleService.create(createModuleDto);
  }

  @Get()
  @AccessControl(accessProfileConstants.PERMISSIONS.LIST_USER)
  @ApiOperation({ summary: 'List users' })
  @ApiOkResponse({
    description: 'List of users',
    type: UserCreateDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  findAll() {
    return this.moduleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moduleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateModuleDto: UpdateModuleDto) {
    return this.moduleService.update(+id, updateModuleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moduleService.remove(+id);
  }
}
