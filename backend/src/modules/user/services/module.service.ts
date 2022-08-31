import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/database/PrismaService';
import { UserCreateDto } from '../dto/userCreate.dto';
import { UpdateModuleDto } from '../dto/userUpdate.dto';

@Injectable()
export class UserService {

  constructor(private prisma: PrismaService) { }

  async create(userDto: UserCreateDto) {
    // const user = await this.prisma.user.create({ data: userDto });

    // return user;
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} module`;
  }

  update(id: number, updateModuleDto: UpdateModuleDto) {
    return `This action updates a #${id} module`;
  }

  remove(id: number) {
    return `This action removes a #${id} module`;
  }
}
