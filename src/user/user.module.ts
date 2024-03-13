import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from 'src/strategy/jwt.strategy';

@Module({
  imports: [JwtModule.register({}), ConfigModule],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
})
export class UserModule { }
