import { ApiProperty } from "@nestjs/swagger"

export class dangkyDTO {

    @ApiProperty({ type: String, description: "hoten", example: "trunghieu" })
    ho_ten: string

    @ApiProperty({ type: String, description: "email", example: "trunghieu01@gmail.com" })
    email: string

    @ApiProperty({ type: String, description: "so_dt", example: "123456" })
    so_dt: string

    @ApiProperty({ type: String, description: "mat_khau", example: "555" })
    mat_khau: string
}