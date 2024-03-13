import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { dangkyDTO } from './dto/dangky.dto';
import { dangnhapDTO } from './dto/dangnhap.dto';
import { AuthGuard } from '@nestjs/passport';
import { NguoiDungVMDTO } from './dto/NguoiDungVM.dto';
import { query } from 'express';

@ApiTags("QuanLyNguoiDung")

@Controller('api')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get("/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung")
  async getListTypeUser(@Res() res): Promise<any> {
    let data = await this.userService.getListTypeUser()
    res.status(data.status).json(data)
  }

  @Post("/QuanLyNguoiDung/DangKy")
  async dangkyUser(@Body() dangkyDTO: dangkyDTO, @Res() res): Promise<any> {
    let data = await this.userService.dangkyUser(dangkyDTO)
    res.status(data.status).json(data)
  }
  @Post("/QuanLyNguoiDung/DangNhap")
  async dangnhapUser(@Body() dangnhapUser: dangnhapDTO, @Res() res): Promise<any> {
    let data = await this.userService.dangnhapUser(dangnhapUser)
    res.status(data.status).json(data)
  }

  @ApiQuery({ name: "tuKhoa", required: false, description: "Từ khoá" })
  @Get("/QuanLyNguoiDung/LayDanhSachNguoiDung")
  async getListUser(
    @Res() res,
    @Query("tuKhoa") filter: string
  ): Promise<any> {
    const data = await this.userService.getListUser(filter);
    return res.status(data.status).json(data);
  }

  @ApiQuery({ name: "page", required: false })
  @ApiQuery({ name: "size", required: false })
  @ApiQuery({ name: "tuKhoa", required: false })
  @Get("/QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang")
  async getListUserPage(
    @Query("page") page,
    @Query("size") size,
    @Query("tuKhoa") tuKhoa,
    @Res() res): Promise<any> {
    let data = await this.userService.getListUserPage(page, size, tuKhoa)
    res.status(data.status).json(data);
  }

  @ApiQuery({ name: "tuKhoa", required: false, description: "Từ khoá" })
  @Get("/QuanLyNguoiDung/TimKiemNguoiDung")
  async timKiemUser(
    @Res() res,
    @Query("tuKhoa") filter: string
  ): Promise<any> {
    const data = await this.userService.timKiemUser(filter);
    return res.status(data.status).json(data);
  }

  @ApiQuery({ name: "page", required: false })
  @ApiQuery({ name: "size", required: false })
  @ApiQuery({ name: "tuKhoa", required: false })
  @Get("/QuanLyNguoiDung/TimKiemNguoiDungPhanTrang")
  async timKiemUserPage(
    @Query("page") page,
    @Query("size") size,
    @Query("tuKhoa") tuKhoa,
    @Res() res): Promise<any> {
    let data = await this.userService.timKiemUserPage(page, size, tuKhoa)
    res.status(data.status).json(data);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Post("/QuanLyNguoiDung/ThongTinTaiKhoan")
  async getInforUser(@Req() req, @Res() res): Promise<any> {
    const taiKhoan = req.user.tai_khoan
    let data = await this.userService.getInforUser(taiKhoan)
    res.status(data.status).json(data)
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @ApiQuery({ name: "taiKhoan", required: false, example: "1" })
  @Post("/QuanLyNguoiDung/LayThongTinNguoiDung")
  async getInforNguoiDung(@Res() res, @Query("taiKhoan") taiKhoan): Promise<any> {
    let data = await this.userService.getInforNguoiDung(taiKhoan)
    res.status(data.status).json(data)
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Post("/QuanLyNguoiDung/ThemNguoiDung")
  async addNguoiDung(@Res() res, @Body() NguoiDungVMDTO: NguoiDungVMDTO): Promise<any> {
    let data = await this.userService.addNguoiDung(NguoiDungVMDTO)
    res.status(data.status).json(data)
  }

  @ApiQuery({ name: "taiKhoan", required: false, description: "tai khoan" })
  @Delete("/QuanLyNguoiDung/XoaNguoiDung")
  async deleteNguoiDung(@Res() res, @Query("taiKhoan") taiKhoan): Promise<any> {
    let data = await this.userService.deleteNguoiDung(taiKhoan)
    res.status(data.status).json(data)
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @ApiParam({ name: "taiKhoan", required: false, example: "1", description: "tai khoan" })
  @Put("/QuanLyNguoiDung/CapNhatThongTinNguoiDung/:taiKhoan")
  async updateNguoiDung(
    @Res() res,
    @Param("taiKhoan") taiKhoan,
    @Body() NguoiDungVMDTO: NguoiDungVMDTO): Promise<any> {
    let data = await this.userService.updateNguoiDung(NguoiDungVMDTO, taiKhoan)
    res.status(data.status).json(data)
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @ApiParam({ name: "taiKhoan", required: false, example: "1", description: "tai khoan" })
  @Post("/QuanLyNguoiDung/CapNhatThongTinNguoiDung/:taiKhoan")
  async updateUser(
    @Res() res,
    @Param("taiKhoan") taiKhoan,
    @Body() NguoiDungVMDTO: NguoiDungVMDTO): Promise<any> {
    let data = await this.userService.updateNguoiDung(NguoiDungVMDTO, taiKhoan)
    res.status(data.status).json(data)
  }
}