import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class RapService {

    prisma = new PrismaClient()
    async getListRap(maHeThongRap): Promise<any> {
        try {
            let data = await this.prisma.hethongrap.findMany({
                where: {
                    ma_he_thong_rap: Number(maHeThongRap)
                }
            })
            return {
                status: 201,
                data: data
            }
        } catch (error) {
            return {
                status: 500,
                message: error
            }
        }
    }

    async getListCumRap(maHeThongRap): Promise<any> {
        try {
            let data = await this.prisma.cumrap.findMany({
                where: {
                    ma_he_thong_rap: Number(maHeThongRap)
                },
                include: {
                    rapphim: {
                        select: {
                            ma_rap: true,
                            ten_rap: true,
                            ma_cum_rap: false
                        }
                    }
                }
            })
            return {
                status: 201,
                data: data
            }
        } catch (error) {
            return {
                status: 500,
                message: error
            }
        }
    }

    async getListLichChieuHeThongRap(maHeThongRap): Promise<any> {
        try {
            let data = await this.prisma.cumrap.findMany({
                where: {
                    ma_he_thong_rap: Number(maHeThongRap)
                },
                include: {
                    rapphim: {
                        include: {
                            lichchieu: {
                                include: {
                                    phim: true
                                }
                            }
                        }
                    }
                }
            })
            return {
                status: 201,
                data: data
            }
        } catch (error) {
            return {
                status: 500,
                message: error
            }
        }
    }

    async getListLichChieuPhim(maPhim): Promise<any> {
        try {
            let data = await this.prisma.phim.findMany({
                where: {
                    ma_phim: Number(maPhim)
                },
                include: {
                    lichchieu: {
                        select: {
                            ma_lich_chieu: true,
                            ma_rap: true,
                            ngay_gio_chieu: true,
                            gia_ve: true
                        }
                    }
                }
            })
            return {
                status: 201,
                data: data
            }
        } catch (error) {
            return {
                status: 500,
                message: error
            }
        }
    }
}
