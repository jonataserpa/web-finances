import { Logger, LogLevel, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { buildSwagger } from './config/swagger/swagger.config';

async function bootstrap() {
  const logger = new Logger();

  const app = await NestFactory.create(AppModule);
  
  app.setGlobalPrefix(process.env.API_PREFIX);
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  buildSwagger(app);

  await app.listen(process.env.API_PORT || 3000);

  logger.log(`Server running in PORT ${process.env.API_PORT || 3000}`);
  logger.log(`Server running with PREFIX /${process.env.API_PREFIX}`);
}
bootstrap();
