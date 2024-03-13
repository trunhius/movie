import { Controller, Get, Put, Query, Res } from '@nestjs/common';
import { RapService } from './rap.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags("QuanLyRap")
@Controller('api')
export class RapController {
  constructor(private readonly rapService: RapService) { }

  @ApiQuery({ name: "maHeThongRap", required: false, description: "ma he thong rap" })
  @Get("/QuanLyRap/LayThongTinHeThongRap")
  async getListRap(@Res() res, @Query("maHeThongRap") maHeThongRap): Promise<any> {
    let data = await this.rapService.getListRap(maHeThongRap)
    res.status(data.status).json(data)
  }

  @ApiQuery({ name: "maHeThongRap", required: false, description: "ma he thong rap" })
  @Get("/QuanLyRap/LayThongTinCumRapTheoHeThong")
  async getListCumRap(@Res() res, @Query("maHeThongRap") maHeThongRap): Promise<any> {
    let data = await this.rapService.getListCumRap(maHeThongRap)
    res.status(data.status).json(data)
  }

  @ApiQuery({ name: "maHeThongRap", required: false, description: "ma he thong rap" })
  @Get("/QuanLyRap/LayThongTinLichChieuHeThongRap")
  async getListLichChieuHeThongRap(@Res() res, @Query("maHeThongRap") maHeThongRap): Promise<any> {
    let data = await this.rapService.getListLichChieuHeThongRap(maHeThongRap)
    res.status(data.status).json(data)
  }

  @ApiQuery({ name: "maPhim", required: false, description: "ma phim", example: "11" })
  @Get("/QuanLyRap/LayThongTinLichChieuPhim")
  async getListLichChieuPhim(@Res() res, @Query("maPhim") maPhim): Promise<any> {
    let data = await this.rapService.getListLichChieuPhim(maPhim)
    res.status(data.status).json(data)
  }
}
