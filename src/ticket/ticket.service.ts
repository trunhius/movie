import { HttpStatus, Injectable } from '@nestjs/common';
import { DanhSachVeDatDto } from './dto/danhSachVe.dto';
import { PrismaClient } from '@prisma/client';
import _ from 'lodash';
import { LichChieuInsert } from './dto/LichChieuInsert.dto';
@Injectable()
export class TicketService {
    prisma = new PrismaClient()

    async bookVe(DanhSachVeDatDto: DanhSachVeDatDto, taiKhoan: any): Promise<any> {
        try {
            let req = DanhSachVeDatDto;
            let data = await this.prisma.datve.create({
                data: {
                    ma_lich_chieu: req.maLichChieu,
                    ma_ghe: req.danhSachVe[0].maGhe,
                    gia_ve: req.danhSachVe[0].giaVe,
                    tai_khoan: taiKhoan
                }
            })
            return {
                status: HttpStatus.CREATED,
                message: 'Book vé thành công',
                data: data,
            };
        } catch (error) {
            return {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message || 'Lỗi server',
            };
        }
    }

    async getListTicket(lichchieu): Promise<any> {
        try {

            let lichchieuNB = Number(lichchieu)
            let data = await this.prisma.lichchieu.findFirst({
                where: {
                    ma_lich_chieu: lichchieuNB
                },
                include: {
                    phim: true,
                    rapphim: {
                        include: {
                            ghe: true
                        }
                    }
                }
            })
            // let newData = [data.ma_lich_chieu, data.rapphim.cumrap.ten_cum_rap, data.rapphim.ten_rap, data.rapphim.cumrap.dia_chi, data.phim.ten_phim, data.phim.hinh_anh, data.ngay_gio_chieu]
            // const rearrangedData = {
            //     "thongTinPhim": _.pick(data, [data.ma_lich_chieu, data.rapphim.cumrap.ten_cum_rap, data.rapphim.ten_rap, data.rapphim.cumrap.dia_chi, data.phim.ten_phim, data.phim.hinh_anh, data.ngay_gio_chieu]),
            //     // "danhSachGhe": data.danhSachGhe.map(ghe => _.pick(ghe, ['maGhe', 'tenGhe', 'maRap', 'loaiGhe', 'stt', 'giaVe', 'daDat', 'taiKhoanNguoiDat']))
            // };
            return {
                status: 200,
                message: "Xử lý thành công",
                data: data
            }
        } catch (error) {
            return {
                status: 500,
                message: error
            }
        }
    }

    async craeteLichChieu(LichChieuInsert: LichChieuInsert): Promise<any> {
        try {
            if (!LichChieuInsert || !LichChieuInsert.ma_phim || !LichChieuInsert.ngay_gio_chieu || !LichChieuInsert.ma_rap || !LichChieuInsert.gia_ve) {
                return {
                    status: 400,
                    message: 'Dữ liệu đầu vào không hợp lệ.',
                };
            }
            let { ma_rap, ma_phim, ngay_gio_chieu, gia_ve } = LichChieuInsert;
            console.log(ma_rap, ma_phim, ngay_gio_chieu, gia_ve)
            let data = await this.prisma.lichchieu.create({
                data: {
                    ma_rap: 11,
                    ma_phim: 11,
                    ngay_gio_chieu: "2024-02-15T18:30:00",
                    gia_ve: 130000
                }
            })
            return {
                status: 201,
                message: "Tạo lịch chiếu thành công!",
                data: data
            }
        } catch (error) {
            return {
                status: 500,
                message: 'Lỗi server',
            };
        }
    }
}
