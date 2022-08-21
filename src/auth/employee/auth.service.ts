import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { AuthDto } from "./dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

@Injectable({})
export class AuthService {
    constructor(
        private prisma: PrismaService, 
    ) {}
    
    // Project Functions

    // REGISTER
    async register(userId: number, dto: AuthDto) {

        try {
            const newEmployee = await this.prisma.employee.create({
                data: {
                    hour_price: dto.hour_price,
                    cpf: dto.cpf,
                    userId,
                }
            })
            console.log(newEmployee)
            return newEmployee
        }   catch(error) {
            if(error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Credenciais em uso',);
                }
            }
        }

    }

}