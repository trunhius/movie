import { Module } from '@nestjs/common';
import { RapService } from './rap.service';
import { RapController } from './rap.controller';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("QuanLyRap")
@Module({
  controllers: [RapController],
  providers: [RapService],
})
export class RapModule { }
