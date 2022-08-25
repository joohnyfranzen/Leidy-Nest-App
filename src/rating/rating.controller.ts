import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';

import { ratingDto } from './dto/rating.dto';
import { RatingService } from './rating.service';

@Controller('rating')
export class RatingController {
    constructor(private ratingService: RatingService) {}

    @HttpCode(HttpStatus.CREATED)
    @Post()
    createRate(
        @Body() dto: ratingDto,
        @GetUser('id') userId: number
    ) {
        return this.ratingService.createRate(dto, userId)
    }
}
