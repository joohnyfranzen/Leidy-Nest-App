import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";


@Injectable({})
export class AuthService {
    constructor(
        private prisma: PrismaService, 
        private jwt: JwtService,
        private config: ConfigService,
    ) {}
    
    // Project Functions

    // REGISTER
    async register(dto: AuthDto) {
        const password = await argon.hash(dto.password);
        try {
            const newUser = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    password,     
                }
            })
            return this.userToken(newUser.id, newUser.email);
        }   catch(error) {
            if(error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Credenciais em uso',);
                }
            }
        }
    }

    // LOGIN

    async login(dto: AuthDto) {
        // Find User
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            },
        });
        // Verify if User is correct
        if(!user) {
            throw new ForbiddenException('Credenciais incorretas!',)
        }
        // Verify if password matches
        const pwMatches = await argon.verify
        (
            user.password, dto.password
        )
        if(!pwMatches) {
            throw new ForbiddenException('Senha incorreta!',)
        }
        // Return user to Token
        return this.userToken(user.id, user.email)
    }

    // Return user Token
    async userToken(userId: number, email: string):  Promise<{ access_token: string }> {
        const payload = {
            sub: userId,
            email,
        } 
        const secret = this.config.get('JWT_SECRET')

        const token = await this.jwt.signAsync(
            payload, 
            {
            expiresIn: '15m',
            secret: secret,
        })

        return {
            access_token: token,
        };
    }
}