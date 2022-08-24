import { Injectable } from '@nestjs/common';
import { take } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';
import select from 'src/utils/select';
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

        // Show Message 
        
        async showMessages(userId: number, query) {
            const showMessage = await this.prisma.chat.findMany(                
                {                  
                    where: { 
                        OR:[{
                                userFromId: userId, userToId: +query.userTo, 
                            },
                            { 
                                userToId: userId, userFromId: +query.userTo, 
                            }
                            ] 
                        },
                        take: 10,
                        select: select(['message', 'createdAt', 'viewed', 'status',]),
                    orderBy: { createdAt: 'asc' }
                        
                    }
            )
            return showMessage
        }
}
