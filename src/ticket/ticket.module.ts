import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import { ConfigModule } from '@nestjs/config';



@Module({
  imports: [ConfigModule],
  controllers: [TicketController],
  providers: [TicketService, JwtStrategy],
})
export class TicketModule { }
