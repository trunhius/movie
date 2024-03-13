import { Module } from '@nestjs/common';
import { FilmService } from './film.service';
import { FilmController } from './film.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  // MulterModule.register({ dest: "./pulic/img" })
  imports: [CloudinaryModule,],
  controllers: [FilmController],
  providers: [FilmService],
})
export class FilmModule { }
