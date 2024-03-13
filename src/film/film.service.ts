import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { FilmDTO } from './dto/film.dto';

@Injectable()
export class FilmService {

    prisma = new PrismaClient()

    async getListBanner(): Promise<any> {
        try {
            let data = await this.prisma.banner.findMany()
            return {
                status: 200,
                data: data,
            }
        } catch (error) {
            return {
                status: 500,
                message: "Lỗi xử lý: " + error.message,
            };
        }
    }

    async getListFilm(tenphim: string): Promise<any> {
        try {
            let data = await this.prisma.phim.findMany({
                where: {
                    ten_phim: {
                        contains: tenphim
                    }
                }
            })
            return {
                status: 200,
                data: data,
            }
        } catch (error) {
            return {
                status: 500,
                message: "Lỗi xử lý: " + error.message,
            };
        }
    }

    async getListFilmPage(tenphim: string, page: string, size: string): Promise<any> {
        try {
            let numSize = Number(size)
            let numPage = Number(page)
            let skip = (numPage - 1) * numSize
            let data = await this.prisma.phim.findMany({
                where: {
                    ten_phim: {
                        contains: tenphim
                    }
                },
                skip: skip,
                take: numSize
            })
            return {
                status: 200,
                data: data,
            }
        } catch (error) {
            return {
                status: 500,
                message: "Lỗi xử lý: " + error.message,
            };
        }
    }

    async getListFilmDate(startDate, endDate, tenphim, page, size): Promise<any> {
        let numSize = Number(size)
        let numPage = Number(page)
        let skip = (numPage - 1) * numSize
        try {
            let data = await this.prisma.phim.findMany({
                where: {
                    ngay_khoi_chieu: {
                        gte: startDate,
                        lte: endDate
                    },
                    ten_phim: {
                        contains: tenphim
                    }
                },
                skip: skip,
                take: numSize
            })
            return {
                status: 200,
                data: data,
            }
        } catch (error) {
            return {
                status: 500,
                message: "Lỗi xử lý: " + error.message,
            };
        }
    }

    async addFilm(FilmDTO: FilmDTO, img): Promise<any> {
        try {
            console.log(img)
            // if (!img) {
            //     throw new Error("Ảnh không tồn tại.");
            // }

            let { ten_phim, trailer, hinh_anh, mo_ta, ngay_khoi_chieu, danh_gia, hot, dang_chieu, sap_chieu } = FilmDTO;

            // // Kiểm tra và định dạng ngày
            // if (ngay_khoi_chieu) {
            //     ngay_khoi_chieu = new Date(ngay_khoi_chieu);
            //     if (isNaN(ngay_khoi_chieu.getTime())) {
            //         throw new Error("Ngày khởi chiếu không hợp lệ.");
            //     }
            // }

            let data = await this.prisma.phim.create({
                data: {
                    ten_phim,
                    trailer,
                    hinh_anh,
                    mo_ta,
                    ngay_khoi_chieu,
                    danh_gia,
                    hot,
                    dang_chieu,
                    sap_chieu
                }
            });

            return {
                status: 200,
                data: data
            };
        } catch (error) {
            return {
                status: 500,
                message: "Lỗi xử lý: " + error.message,
            };
        }
    }
    async addFilmm(FilmDTO: FilmDTO): Promise<any> {
        try {

            let { ten_phim, trailer, hinh_anh, mo_ta, ngay_khoi_chieu, danh_gia, hot, dang_chieu, sap_chieu } = FilmDTO;
            let data = await this.prisma.phim.create({
                data: {
                    ten_phim,
                    trailer,
                    hinh_anh,
                    mo_ta,
                    ngay_khoi_chieu,
                    danh_gia,
                    hot,
                    dang_chieu,
                    sap_chieu
                }
            });

            return {
                status: 200,
                data: data
            };
        } catch (error) {
            return {
                status: 500,
                message: "Lỗi xử lý: " + error.message,
            };
        }
    }
    async deleteFilm(maPhim: string): Promise<any> {
        try {
            let data = await this.prisma.phim.delete({
                where: {
                    ma_phim: Number(maPhim),
                }
            })
            return {
                status: 200,
                message: "Film deleted successfully",
                data: data, // You may include the deleted data if needed
            }
        } catch (error) {
            return {
                status: 500,
                message: "Lỗi xử lý: " + error.message,
            };
        }
    }

    async xoaPhim(maPhim: string): Promise<any> {
        try {
            let data = await this.prisma.phim.delete({
                where: {
                    ma_phim: Number(maPhim),
                }
            })
            return {
                status: 200,
                message: "Film deleted successfully",
                data: data,
            }
        } catch (error) {
            return {
                status: 500,
                message: "Lỗi xử lý: " + error.message,
            };
        }
    }

    async thongTinPhimTheoMa(maPhim): Promise<any> {
        try {
            let data = await this.prisma.phim.findFirst({
                where: {
                    ma_phim: Number(maPhim)
                }
            })
            return {
                status: 200,
                message: "Film deleted successfully",
                data: data,
            }
        } catch (error) {
            return {
                status: 500,
                message: "Lỗi xử lý: " + error.message,
            };
        }
    }
}

