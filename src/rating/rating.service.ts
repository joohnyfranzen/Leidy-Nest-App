import { Injectable } from '@nestjs/common';
import { count } from 'console';
import { GetUser } from 'src/auth/decorator';
import select from 'src/utils/select';
import { PrismaService } from '../prisma/prisma.service';
import { ratingDto } from './dto/rating.dto';

@Injectable()
export class RatingService {
    constructor (
        private prisma: PrismaService,
    ) {}

    async createRate(userId: number, dto: ratingDto, userToId: number) {
        dto.value = +dto.value
        userToId = +userToId

        try {
            const userTo = await this.prisma.order.findFirst({
                where: { 
                    userId: userToIdz2,
                    userGet: userId,
                }
            })
            const newRate = await this.prisma.rating.create({
                data: Object.assign(
                    {
                        user_to: userId,
                        user_from: userToId,
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

    async RateUpload(
        @GetUser('id') userId: number,
    ) {

        try {
            const getLastRating = await this.prisma.rating.findMany({
                where: { 
                    user_to: userId 
                },
                take: 50,
                //select: select(['value'])
            })
            return getLastRating
            // const allRate = count(getLastRating)
            //const 
            // const ratingGenerate = await this.prisma.rating.
        } catch (error) {
            console.log(error)
        }
    }
}
