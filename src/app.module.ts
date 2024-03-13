import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilmModule } from './film/film.module';
import { UserModule } from './user/user.module';
import { RapModule } from './rap/rap.module';
import { TicketModule } from './ticket/ticket.module';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [FilmModule,
    UserModule,
    RapModule,
    TicketModule,
    ConfigModule.forRoot({ isGlobal: true }),
    // ServeStaticModule.forRoot({
    //   rootPath: "."
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
