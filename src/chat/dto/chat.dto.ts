import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class ChatDto {

    @MaxLength(350)
    @IsString()
    message: Text

}