import { ApiProperty } from "@nestjs/swagger";

export class LichChieuInsert {
    @ApiProperty({ type: 'number', description: 'Mã rạp', example: "4" })
    ma_rap: number;

    @ApiProperty({ type: 'integer', format: 'int32', description: 'Mã phim', example: "4" })
    ma_phim: number;

    @ApiProperty({ type: 'date', description: 'Ngày chiếu và giờ chiếu (ví dụ: "2024-02-15T18:30:00")', example: "2024-02-15T18:30:00" })
    ngay_gio_chieu: Date;

    @ApiProperty({ type: 'number', format: 'double', description: 'Giá vé', example: "130000" })
    gia_ve: number;
}