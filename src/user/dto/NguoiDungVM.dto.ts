import { ApiProperty } from '@nestjs/swagger';

export class NguoiDungVMDTO {

    @ApiProperty({ type: String, example: 'examplePassword', description: 'Mật khẩu người dùng' })
    mat_khau: string;

    @ApiProperty({ type: String, example: 'example@email.com', description: 'Địa chỉ email người dùng' })
    email: string;

    @ApiProperty({ type: String, example: '0123456789', description: 'Số điện thoại người dùng' })
    so_dt: string;

    @ApiProperty({ type: String, example: 'customer', description: 'Mã loại người dùng' })
    loai_nguoi_dung: string;

    @ApiProperty({ type: String, example: 'Nguyen Van A', description: 'Họ và tên người dùng' })
    ho_ten: string;
}