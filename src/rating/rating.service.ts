import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ratingDto } from './dto/rating.dto';

@Injectable()
export class RatingService {
    constructor (
        private prisma: PrismaService,
    ) {}

    async createRate(userId: number, dto: ratingDto) {

        try {
            const userTo = await this.prisma.order.findFirst({
                where: { 
                    userId: userId,
                    // userGet: userId,
                }
            })
            const newRate = await this.prisma.rating.create({
                data: Object.assign(
                    {
                        user_to: userId,
                        user_from: userId,
                        value: dto.value,
                        text: dto.text,
                    }
                )
            })
            return {userTo, newRate}
        } catch (error) {
            console.log(error)
        }
    }
    async editRate(userId: number, dto: ratingDto) {

        try {
            const editedUser = await this.prisma.rating.update({
                where: {
                    id: userId,
                },
                data: {
                    ...dto,
                }
            })
            return editedUser      
        } catch (error) {
            console.log(error)
        }
    }
    
    async showRate(
        id: number,
        userId: number
        ) {

        try {
            const rate = await this.prisma.rating.findFirst({
                where: { 
                    user_from: userId, user_to: id
                }
            })
            
            return rate;
        } catch (error) {
            console.log(error)
        }
    }

    async deleteRate(
        id: number,
    ) {

        try {
            const deletedRate = await this.prisma.rating.delete({
                where: 
                {
                id: id
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
}
