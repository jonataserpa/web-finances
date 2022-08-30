import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ModuleModule } from './modules/user/module.module';
//decorator - Javascript - Ecmascript 7

@Module({
  imports: [AuthModule, ModuleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
