import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import select from 'src/utils/select';


@Injectable({})
export class DashboardService {
    constructor (
        private prisma: PrismaService,
    ) {}

        // DASHBOARD Functions

        async showUsers() {
            try {
                const showUser = await this.prisma.user.findMany({
                    orderBy:{
                        rating: 'asc'
                    },
                    take: 7,
                    select: select(['name', 'nick_name', 'perfil_photo', 'rating'])
                });
                return showUser;
            } catch(error) {
                console.log(error)
            };
        };
}
