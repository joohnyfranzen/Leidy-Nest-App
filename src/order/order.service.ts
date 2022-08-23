import { Injectable, UseGuards } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import select from 'src/utils/select';
import { OrderDto } from './dto/order.dto';

@Injectable()
export class OrderService {
    constructor ( 
        private prisma: PrismaService,
        ) {}

    // ORDER Functions

    // New Order

    async newOrder(userId: number, dto: OrderDto, ) {

        dto.price = +dto.price;

        const newOrder = await this.prisma.order.create({
            data: Object.assign( dto, {userId} )
            })
        return newOrder
    }

    // Show Orders

    async show(id : number) {
        try {
            const order = await this.prisma.order.findFirst({where: {id: +id}})
            return order
        } catch(error) {
            console.log(error)
        }
    }

    // Search

    async search(query){
        const { q, order, orderAsc = 'asc' } = query

        try{
            const querySearch = await this.prisma.order.findMany({
                select: select(['id', 'createdAt', 'title', 'type', 'description']),
                where: {
                    OR:[
                        { title: {contains: q} },
                        { description: {contains: q} },
                        { type: {contains: q} },
                        +q ? { price: {equals: +q} } : null
                    ]
                },
                    orderBy: order ? {[order]: orderAsc} : { createdAt: 'desc' }
            })
            return querySearch;
        }catch(error){
            console.log(error)
        }
    }
}
