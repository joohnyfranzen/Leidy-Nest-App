import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class OrderDto {
    
    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    type: string

    @IsString()
    @IsNotEmpty()
    description: string

    price: number

    month_date_start: Date

    month_date_end: Date

    weekly: boolean

    week_day_start: number

    week_day_end: number
 
    daily: boolean

    weekend: boolean

    holiday: boolean
} 