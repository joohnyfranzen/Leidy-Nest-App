import { Controller, Get, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { DashboardService } from './dashboard.service';


@UseGuards(JwtGuard)
@Controller('dashboard')
export class DashboardController {
    constructor(private dashboardService: DashboardService) {}
    
    @HttpCode(HttpStatus.OK)
    @Get('perfis')
    showUsers() {
        return this.dashboardService.showUsers();
    };
}
