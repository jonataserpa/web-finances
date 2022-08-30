import { Module } from '@nestjs/common';
import { ModuleController } from './controllers/module.controller';
import { ModuleService } from './services/module.service';

@Module({
  controllers: [ModuleController],
  providers: [ModuleService]
})
export class ModuleModule {}
