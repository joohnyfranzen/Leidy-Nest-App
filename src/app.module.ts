import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthEmployeeModule } from './auth/employee/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { DashboardController } from './dashboard/dashboard.controller';
import { DashboardService } from './dashboard/dashboard.service';
import { RequestModule } from './request/request.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), AuthModule, UserModule, PrismaModule, AuthEmployeeModule, DashboardModule, RequestModule],
  controllers: [DashboardController],
  providers: [DashboardService],

})
export class AppModule {}
