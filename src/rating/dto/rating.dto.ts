import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ratingDto {

    @IsNotEmpty()
    @IsNumber()
    status: number

    @IsNotEmpty()
    @IsNumber()
    value: number

    @IsNotEmpty()
    @IsString()
    text: string
}