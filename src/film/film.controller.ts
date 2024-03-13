import { Body, Controller, Delete, Get, Param, Post, Query, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilmService } from './film.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fetchData } from 'src/utils';
import { FilmDTO } from './dto/film.dto';

@ApiTags("QuanLyPhim")
@Controller('api')
export class FilmController {
  constructor(private readonly filmService: FilmService,
    private cloudinaryService: CloudinaryService) { }

  @Get("/QuanLyPhim/LayDanhSachBanner")
  async getListBanner(@Res() res): Promise<any> {
    let data = await this.filmService.getListBanner()
    res.status(data.status).json(data)
  }

  // @ApiQuery({ name: "tenphim", required: false, description: "ten phim" })
  @Get("/QuanLyPhim/LayDanhSachPhim")
  async getListFilm(
    @Res() res,
    @Query("tenphim") tenphim: string): Promise<any> {
    let data = await this.filmService.getListFilm(tenphim)
    res.status(data.status).json(data)
  }

  @ApiQuery({ name: "page", required: false })
  @ApiQuery({ name: "size", required: false })
  @ApiQuery({ name: "tenphim", required: false })
  @Get("/QuanLyPhim/LayDanhSachPhimPhanTrang")
  async getListFilmPage(
    @Res() res,
    @Query("tenphim") tenphim,
    @Query("page") page,
    @Query("size") size): Promise<any> {
    let data = await this.filmService.getListFilmPage(tenphim, page, size)
    res.status(data.status).json(data)
  }

  @ApiQuery({ name: "page", required: false })
  @ApiQuery({ name: "size", required: false })
  @ApiQuery({ name: "tenphim", required: false })
  @ApiQuery({ name: "startDate", required: false, description: "ten phim", example: "2024-02-10" })
  @ApiQuery({ name: "endDate", required: false, description: "ten phim", example: "2024-02-16" })
  @Get("/QuanLyPhim/LayDanhSachPhimTheoNgay")
  async getListFilmDate(
    @Res() res,
    @Query("tenphim") tenphim,
    @Query("page") page,
    @Query("size") size,
    @Query("startDate") startDate: string,
    @Query("endDate") endDate: string,): Promise<any> {
    let data = await this.filmService.getListFilmDate(startDate, endDate, tenphim, page, size)
    res.status(data.status).json(data)
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiConsumes("application/json")
  @Post("/QuanLyPhim/ThemPhimUploadHinh")
  @UseInterceptors(FileInterceptor("file"))
  async upLoadCloud(
    @UploadedFile("file") file: Express.Multer.File,
    @Body() FilmDTO: FilmDTO,
    @Res() res): Promise<any> {
    const img = await this.cloudinaryService.uploadImage(file)
    let data = await this.filmService.addFilm(FilmDTO, img.url)
    res.status(data.status).json(data)
  }

  @Post("/QuanLyPhim/ThemPhimUploadHinhh")
  async upLoadClou(
    @Body() FilmDTO: FilmDTO,
    @Res() res): Promise<any> {
    let data = await this.filmService.addFilmm(FilmDTO)
    res.status(data.status).json(data)
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        // comment: { type: 'string' },
        // outletId: { type: 'integer' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post("/QuanLyPhim/CapNhatPhimUpload")
  @UseInterceptors(FileInterceptor("file"))
  upLoadCloudd(@UploadedFile("file") file: Express.Multer.File) {
    return this.cloudinaryService.uploadImage(file)
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'file',
          format: 'binary',
        },
      },
    },
  })
  @ApiQuery({ name: "tenPhim", description: "ten phim", required: false })
  @Post("/api/QuanLyPhim")
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: process.cwd() + "/pulic/img",
      filename: (req, file, callback) => {
        callback(null, new Date().getTime() + `${file.originalname}`)
      }
    })
  }))
  async uploadFile(@UploadedFile() file,
    @Query('tenPhim') tenPhim: string) {
    console.log(tenPhim, file)
    return 'File uploaded successfully!';
    //   let data = await this.filmService.managePhim(tenPhim)
    //   res.status(data.status).json(data)
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @ApiQuery({ name: "maPhim", required: false, description: "ma phim" })
  @Delete("/QuanLyPhim/XP")
  async deleteFilm(@Res() res, @Query("maPhim") maPhim): Promise<any> {
    let data = await this.filmService.deleteFilm(maPhim)
    res.status(data.status).json(data)
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @ApiQuery({ name: "maPhim", required: false, description: "ma phim" })
  @Delete("/QuanLyPhim/XoaPhim")
  async XoaPhim(@Res() res, @Query("maPhim") maPhim): Promise<any> {
    let data = await this.filmService.xoaPhim(maPhim)
    res.status(data.status).json(data)
  }

  @ApiParam({ name: "maPhim", required: false, description: "ma phim", example: "1" })
  @Get("/QuanLyPhim/LayThongTinPhim/:maPhim")
  async thongTinPhimTheoMa(
    @Param("maPhim") maPhim,
    @Res() res): Promise<any> {
    let data = await this.filmService.thongTinPhimTheoMa(maPhim)
    res.status(data.status).json(data)
  }
}
