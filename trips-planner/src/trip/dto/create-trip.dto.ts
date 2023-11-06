import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsNumber } from 'class-validator'

export class CreateTripDto {
  @ApiProperty({ default: '', required: true })
  @IsString()
  destination: string

  @ApiProperty({ default: '', required: true })
  @IsString()
  origin: string

  @ApiProperty({ default: '', required: true })
  @IsString()
  distance: string

  @ApiProperty({ default: '', required: true })
  @IsNumber()
  price: number

  @ApiProperty({ default: '', required: true })
  @IsString()
  departure_date: string

  @ApiProperty({ default: '', required: true })
  @IsString()
  return_date: string
}
