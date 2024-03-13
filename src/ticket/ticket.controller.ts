import { Body, Controller, Get, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { DanhSachVeDatDto } from './dto/danhSachVe.dto';
import { AuthGuard } from '@nestjs/passport';
import { LichChieuInsert } from './dto/LichChieuInsert.dto';

@ApiTags("QuanLyDatVe")
@Controller('api')
export class TicketController {
  constructor(private readonly ticketService: TicketService) { }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Post("/QuanLyDatVe/DatVe")
  async datVe(@Body() DanhSachVeDatDto: DanhSachVeDatDto, @Res() res, @Req() req): Promise<any> {
    const taiKhoan = req.user.tai_khoan
    let data = await this.ticketService.bookVe(DanhSachVeDatDto, taiKhoan)
    res.status(data.status).json(data)
  }

  @ApiQuery({ name: "lichchieu", required: true })
  @Get("/QuanLyDatVe/LayDanhSachPhongVe")
  async getListTicket(@Res() res, @Query("lichchieu") lichchieu): Promise<any> {
    let data = await this.ticketService.getListTicket(lichchieu)
    res.status(data.status).json(data)
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Post("/QuanLyDatVe/TaoLichChieu")
  async craeteLichChieu(@Res() res, @Body() LichChieuInsert: LichChieuInsert): Promise<any> {
    let data = await this.ticketService.craeteLichChieu(LichChieuInsert)
    res.status(data.status).json(data)
  }
}
