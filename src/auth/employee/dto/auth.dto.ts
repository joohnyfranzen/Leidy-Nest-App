import { IsEmail, IsNotEmpty, IsString, Min } from "class-validator";

export class AuthDto {
    
    @IsString()
    @IsNotEmpty()
    cpf: string;

    hour_price: number;

}