import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
//decorator - Javascript - Ecmascript 7

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule, 
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
