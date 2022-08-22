import { Injectable, UseGuards } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderDto } from './dto/order.dto';

@Injectable()
export class OrderService {
    constructor ( 
        private prisma: PrismaService,
        ) {}

    // ORDER Functions

    // New Order

    async newOrder(userId: number, dto: OrderDto, ) {
        const newOrder = await this.prisma.order.create({
            data: {
                title: dto.title, 
                type: dto.type, 
                description: dto.description, 
                price: dto.price, 
                month_date_start: dto.month_date_start, 
                month_date_end: dto.month_date_end, 
                weekly: dto.weekly, 
                week_day_start: dto.week_day_start, 
                week_day_end: dto. 
                week_day_end, 
                daily: dto.daily, 
                weekend: dto.weekend, 
                holiday: dto.holiday,
                userId,
            }})
        return newOrder
    }

    // Show Orders

    async showOrders()
}
