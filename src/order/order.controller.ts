import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { OrderDto } from './dto/order.dto';
import { OrderService } from './order.service';

@UseGuards(JwtGuard)
@Controller('order')
export class OrderController {
    constructor(private orderService: OrderService) {}

    @HttpCode(HttpStatus.CREATED)
    @Post('create')
    newOrder(
        @Body() dto: OrderDto, 
        @GetUser('id') userId: number
        ) {
        return this.orderService.newOrder(userId, dto);
    }

    @HttpCode(HttpStatus.ACCEPTED)
    @Get('show/:id')
    show(
        @Param('id') id ) 
    {
        return this.orderService.show(id);
    }

    @HttpCode(HttpStatus.ACCEPTED)
    @Get('search')
    search(
        @Query() query ) 
    {
        return this.orderService.search(query);
    }
}
