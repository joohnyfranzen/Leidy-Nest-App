import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
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
    @Get('show')
    showOrders() 
    {
        return this.orderService.showOrder();
    }
}
