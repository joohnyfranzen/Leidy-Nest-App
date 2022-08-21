import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from "@nestjs/common";
import { GetUser } from "../decorator";
import { JwtGuard } from "../guard";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

@UseGuards(JwtGuard)
@Controller('employee')
export class AuthController {
    constructor(private authService: AuthService) {}

    
    @HttpCode(HttpStatus.CREATED)
    @Post('register')
    register(
        @Body() dto: AuthDto,
        @GetUser('id') userId: number,
        ) {
        return this.authService.register(
            userId,
            dto
            );
    }

}