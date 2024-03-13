import { ApiProperty } from "@nestjs/swagger";

export class FilmDTO {
    @ApiProperty({ description: "Tên phim", example: "Mai" })
    ten_phim: string;

    @ApiProperty({ description: "Trailer", example: "Trailer 1" })
    trailer: string;

    @ApiProperty({ description: "Hình ảnh", example: "" })
    hinh_anh: string;

    @ApiProperty({ description: "Mô tả", example: "Phim Mai noi ve tinh yeu tan vo" })
    mo_ta: string;

    @ApiProperty({ type: 'string', format: 'date-time', description: "Ngày khởi chiếu", example: '2024-02-25T12:00:00' })
    ngay_khoi_chieu: string;

    @ApiProperty({ description: "Đánh giá", example: 4 })
    danh_gia: number;

    @ApiProperty({ description: "Hot", example: true })
    hot: boolean;

    @ApiProperty({ description: "Đang chiếu", example: false })
    dang_chieu: boolean;

    @ApiProperty({ description: "Sắp chiếu", example: true })
    sap_chieu: boolean;
}