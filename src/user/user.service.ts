import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { dangkyDTO } from './dto/dangky.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { dangnhapDTO } from './dto/dangnhap.dto';
import { hashPassword } from '../utils/index'
import { NguoiDungVMDTO } from './dto/NguoiDungVM.dto';
@Injectable()
export class UserService {
    constructor(private JwtService: JwtService,
        private ConfigService: ConfigService) { }

    prisma = new PrismaClient()

    async getListTypeUser(): Promise<any> {
        try {
            let data = await this.prisma.nguoidung.findMany({
                select: {
                    tai_khoan: true,
                    loai_nguoi_dung: true,
                },
            })
            return {
                status: 201,
                message: "xu ly thanh cong",
                data: data
            }
        } catch (error) {
            return {
                status: 500,
                message: error
            }
        }

    }

    async dangkyUser(dangkyDTO: dangkyDTO): Promise<any> {
        try {
            let { ho_ten, email, so_dt, mat_khau } = dangkyDTO;

            // Kiểm tra dữ liệu đầu vào
            if (!ho_ten || !email || !so_dt || !mat_khau) {
                return {
                    status: 400,
                    message: "Vui lòng nhập đầy đủ thông tin!",
                };
            }
            let user = await this.prisma.nguoidung.findFirst({
                where: {
                    email
                }
            });
            if (user) {
                return {
                    status: 401,
                    message: "Tài khoản đã tồn tại!",
                };
            } else {
                try {
                    let newPass = bcrypt.hashSync(mat_khau, 10); // Mã hoá password
                    let newUser = {
                        ho_ten,
                        email,
                        so_dt,
                        mat_khau: newPass,
                    };
                    await this.prisma.nguoidung.create({
                        data: newUser
                    });
                    return {
                        status: 201,
                        message: "Tạo tài khoản thành công!",
                    };
                } catch (bcryptError) {
                    return {
                        status: 500,
                        message: "Lỗi khi mã hoá mật khẩu: " + bcryptError.message,
                    };
                }
            }
        } catch (error) {
            return {
                status: 500,
                message: "Lỗi xử lý: " + error.message,
            };
        }
    }

    async dangnhapUser(dangnhapDTO: dangnhapDTO): Promise<any> {
        try {
            let { email, mat_khau } = dangnhapDTO;
            // kiểm tra email co ton tại trong db kh
            let checkUser = await this.prisma.nguoidung.findFirst({
                where: {
                    email
                }
            })
            if (checkUser) {
                // isCorrectPass
                let isCorrectPass = bcrypt.compareSync(mat_khau, checkUser.mat_khau)
                if (isCorrectPass) {
                    let payloat = {
                        tai_khoan: checkUser.tai_khoan,
                        email: checkUser.email,
                        loai_nguoi_dung: checkUser.loai_nguoi_dung
                    }
                    let token = this.JwtService.sign(payloat, { secret: this.ConfigService.get("SECRET_KEY"), expiresIn: this.ConfigService.get("EXPIRES_IN") })
                    return {
                        status: 200,
                        token: token
                    }
                }
                return {
                    status: 400,
                    message: "Đăng nhập không thành công. Vui lòng kiểm tra lại tên đăng nhập và mật khẩu.",
                };
            }
            return {
                status: 404,
                message: "Người dùng không tồn tại.",
            };
        } catch (error) {
            return {
                status: 500,
                message: "Lỗi xử lý: " + error.message,
            };
        }
    }

    async getListUser(filter: string): Promise<any> {
        try {
            let data = await this.prisma.nguoidung.findMany({
                where: {
                    ho_ten: {
                        contains: filter
                    }
                }
            })
            return {
                status: 201,
                message: "xu ly thanh cong",
                data: data
            }
        } catch (error) {
            return {
                status: 500,
                message: "Lỗi xử lý: " + error.message,
            };
        }
    }

    async getListUserPage(page: number, size: number, tuKhoa: string): Promise<any> {
        try {
            let numPage = Number(page)
            let numSize = Number(size)
            let skip = (numPage - 1) * numSize
            let data = await this.prisma.nguoidung.findMany(
                {
                    where: {
                        ho_ten: {
                            contains: tuKhoa
                        }
                    },
                    skip: skip,
                    take: numSize
                }
            )
            let userAll = await this.prisma.nguoidung.findMany()
            return {
                status: 201,
                message: "xu ly thanh cong",
                content: {
                    currentPage: numPage,
                    count: numSize,
                    totalPages: Math.ceil(userAll.length / numSize),
                    totalCount: userAll.length,
                    data: data
                }
            }
        } catch (error) {
            return {
                status: 500,
                message: "Lỗi xử lý: " + error.message,
            };
        }

    }

    async timKiemUser(filter: string): Promise<any> {
        try {
            let data = await this.prisma.nguoidung.findMany({
                where: {
                    so_dt: {
                        contains: filter
                    }
                }
            })
            return {
                status: 201,
                message: "xu ly thanh cong",
                data: data
            }
        } catch (error) {
            return {
                status: 500,
                message: "Lỗi xử lý: " + error.message,
            };
        }
    }

    async timKiemUserPage(page: number, size: number, tuKhoa: string): Promise<any> {
        try {
            let numPage = Number(page)
            let numSize = Number(size)
            let skip = (numPage - 1) * numSize
            let data = await this.prisma.nguoidung.findMany(
                {
                    where: {
                        ho_ten: {
                            contains: tuKhoa
                        }
                    },
                    skip: skip,
                    take: numSize
                }
            )
            let userAll = await this.prisma.nguoidung.findMany()
            return {
                status: 201,
                message: "xu ly thanh cong",
                content: {
                    currentPage: numPage,
                    count: numSize,
                    totalPages: Math.ceil(userAll.length / numSize),
                    totalCount: userAll.length,
                    data: data
                }
            }
        } catch (error) {
            return {
                status: 500,
                message: "Lỗi xử lý: " + error.message,
            };
        }

    }

    async getInforUser(taiKhoan): Promise<any> {
        try {
            let data = await this.prisma.nguoidung.findFirst({
                where: {
                    tai_khoan: taiKhoan,
                },
                include: {
                    datve: {
                        include: {
                            ghe: {
                                // select: {
                                //     ma_ghe: true,
                                //     ten_ghe: true
                                // },
                                include: {
                                    rapphim: {
                                        // select: {
                                        //     ma_rap: true,
                                        //     ten_rap: true
                                        // },
                                        include: {
                                            cumrap: {
                                                // select: {
                                                //     ma_cum_rap: true,
                                                //     ten_cum_rap: true
                                                // },
                                                include: {
                                                    hethongrap: true
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                        }
                    }
                }
            })
            const newPass = data.mat_khau
            const matkhau = hashPassword(newPass)
            return {
                status: 200,
                message: "xu ly thanh cong",
                data: { ...data, mat_khau: matkhau },
            }
        } catch (error) {
            return {
                status: 500,
                message: "Lỗi xử lý: " + error.message,
            };
        }
    }

    async getInforNguoiDung(taiKhoan: string): Promise<any> {
        try {
            console.log(taiKhoan)
            let data = await this.prisma.nguoidung.findFirst({
                where: {
                    tai_khoan: Number(taiKhoan),
                },
                include: {
                    datve: {
                        include: {
                            ghe: true,
                            lichchieu: {
                                include: {
                                    rapphim: {
                                        include: {
                                            cumrap: {
                                                include: {
                                                    hethongrap: true
                                                }
                                            }
                                        }
                                    },
                                    phim: true
                                }
                            }
                        }
                    }
                }
            })
            const newPass = data.mat_khau
            const matkhau = hashPassword(newPass)
            return {
                status: 200,
                message: "xu ly thanh cong",
                data: { ...data, mat_khau: matkhau },
            }
        } catch (error) {
            return {
                status: 500,
                message: "Lỗi xử lý: " + error.message,
            };
        }
    }

    async addNguoiDung(NguoiDungVMDTO: NguoiDungVMDTO): Promise<any> {
        try {
            let { mat_khau, email, so_dt, loai_nguoi_dung, ho_ten } = NguoiDungVMDTO;

            // Kiểm tra dữ liệu đầu vào
            if (!mat_khau || !email || !so_dt || !loai_nguoi_dung || !ho_ten) {
                return {
                    status: 400,
                    message: "Vui lòng nhập đầy đủ thông tin!",
                };
            }
            let user = await this.prisma.nguoidung.findFirst({
                where: {
                    email
                },
                include: {
                    datve: true
                }
            });
            if (user) {
                return {
                    status: 401,
                    message: "Người dùng đã tồn tại!",
                };
            } else {
                try {
                    let newPass = bcrypt.hashSync(mat_khau, 10); // Mã hoá password
                    let newUser = {
                        ho_ten,
                        email,
                        so_dt,
                        mat_khau: newPass,
                        loai_nguoi_dung,
                    };
                    console.log(newUser)
                    await this.prisma.nguoidung.create({
                        data: newUser
                    });
                    return {
                        status: 201,
                        message: "Tạo người dùng thành công!",
                    };
                } catch (bcryptError) {
                    return {
                        status: 500,
                        message: "Lỗi khi mã hoá mật khẩu: " + bcryptError.message,
                    };
                }
            }
        } catch (error) {
            return {
                status: 500,
                message: "Lỗi xử lý: " + error.message,
            };
        }
    }

    async deleteNguoiDung(taiKhoan): Promise<any> {
        try {
            await this.prisma.nguoidung.delete({
                where: {
                    tai_khoan: Number(taiKhoan)
                }
            })
            return {
                status: 200,
                message: "Xóa người dùng thành công",
            }
        } catch (error) {
            return {
                status: 500,
                message: "Lỗi xử lý: " + error.message,
            };
        }
    }

    async updateNguoiDung(NguoiDungVMDTO: NguoiDungVMDTO, taiKhoan): Promise<any> {
        try {
            console.log(taiKhoan)
            let { mat_khau, email, so_dt, loai_nguoi_dung, ho_ten } = NguoiDungVMDTO;
            let hashedPassword = await bcrypt.hashSync(mat_khau, 10)
            await this.prisma.nguoidung.update({
                where: {
                    tai_khoan: Number(taiKhoan)
                },
                data: {
                    mat_khau: hashedPassword,
                    email,
                    so_dt,
                    loai_nguoi_dung,
                    ho_ten
                }
            })
            return {
                status: 201,
                message: "Cập nhật tài khoản thành công!",
            }
        } catch (error) {
            return {
                status: 500,
                message: "Lỗi xử lý: " + error.message,
            };
        }
    }
}
