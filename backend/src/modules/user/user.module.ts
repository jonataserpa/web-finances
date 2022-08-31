import { Module } from '@nestjs/common';
import { PrismaService } from 'src/config/database/PrismaService';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/module.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService]
})
export class UserModule {}
