import { IsNotEmpty, IsString } from "class-validator";

export class ratingDto {

    status: number

    @IsNotEmpty()
    value: number

    @IsNotEmpty()
    @IsString()
    text: string
}