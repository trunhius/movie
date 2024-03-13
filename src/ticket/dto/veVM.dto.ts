import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber } from 'class-validator';

export class VeVMDto {
    @ApiProperty({ type: Number, description: "maGhe", example: "4" })
    @IsInt()
    maGhe: number;

    @ApiProperty({ type: Number, description: "giaVe", example: "130000" })
    @IsNumber()
    giaVe: number;
}