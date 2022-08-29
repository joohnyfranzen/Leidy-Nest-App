import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { ratingDto } from './dto/rating.dto';
import { RatingService } from './rating.service';

@UseGuards(JwtGuard)
@Controller('rating')
export class RatingController {
    constructor(private ratingService: RatingService) {}

    @HttpCode(HttpStatus.CREATED)
    @Post('create/:id')
    createRate(
        @Body() dto: ratingDto,
        @GetUser('id') userId: number,
        @Param('id') userToId: number,
    ) {
        return this.ratingService.createRate(userId, dto, userToId)
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
