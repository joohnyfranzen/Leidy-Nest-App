import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class DtoAuth {

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}