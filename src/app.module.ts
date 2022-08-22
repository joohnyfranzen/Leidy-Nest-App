import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthEmployeeModule } from './auth/employee/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), AuthModule, UserModule, PrismaModule, AuthEmployeeModule, DashboardModule, OrderModule],
  controllers: [],
  providers: [],

})
export class AppModule {}
