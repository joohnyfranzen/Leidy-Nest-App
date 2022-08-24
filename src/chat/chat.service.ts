import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChatDto } from './dto';

@Injectable()
export class ChatService {
    constructor (
        private prisma: PrismaService,
        ) {}

        // Chat Functions

        // New Chat

        async createMessage(userId: number, dto: ChatDto) {

            const newMessage = await this.prisma.chat.create({
                data: Object.assign(
                    {
                        message: dto.message,
                        userFromId: userId, 
                        userToId: userId,
                    }
                )
            })
            return newMessage;
        }
}
