import { IsInt, IsNumber, ValidateNested, ArrayUnique } from 'class-validator';
import { Type } from 'class-transformer';
import { VeVMDto } from './veVM.dto';
import { ApiProperty } from '@nestjs/swagger';

export class DanhSachVeDatDto {
    @ApiProperty({ type: Number, description: "ma lich chieu", example: '4' })
    @IsInt()
    maLichChieu: number;

    @ApiProperty({ type: VeVMDto, isArray: true, description: 'Danh sách vé đặt' })
    @ArrayUnique() // Đảm bảo tính duy nhất của các phần tử trong mảng
    @ValidateNested({ each: true })
    @Type(() => VeVMDto)
    danhSachVe: VeVMDto[];
}