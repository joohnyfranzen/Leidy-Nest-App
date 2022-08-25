import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';

import { ratingDto } from './dto/rating.dto';
import { RatingService } from './rating.service';

@Controller('rating')
export class RatingController {
    constructor(private ratingService: RatingService) {}

    @HttpCode(HttpStatus.CREATED)
    @Post('create')
    createRate(
        @Body() dto: ratingDto,
        @GetUser('id') userId: number
    ) {
        return this.ratingService.createRate(userId, dto)
    }
    
    @HttpCode(HttpStatus.ACCEPTED)
    @Patch('edit')
    editRate(
        @Body() dto: ratingDto,
        @GetUser('id') userId: number
    ) {
        return this.ratingService.editRate(userId, dto)
    }

    @HttpCode(HttpStatus.OK)
    @Get('show/:id')
    showRate(
        @Param('id') id: number,
        @GetUser('id') userId: number,
    ) {
        return this.ratingService.showRate(id, userId)
    }

    @HttpCode(HttpStatus.ACCEPTED)
    @Delete('delete/:id')
    deleteRate(
        @Param('id') id: number,
    ) {
        return this.ratingService.deleteRate(id)
    }
}
