import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class CreateUserDto {
  @ApiProperty({ default: '', required: true })
  @IsString()
  email: string

  @ApiProperty({ default: '', required: true })
  @IsString()
  username: string

  @ApiProperty({ default: '', required: true })
  @IsString()
  first_name: string

  @ApiProperty({ default: '', required: true })
  @IsString()
  last_name: string

  @ApiProperty({ default: '', required: true })
  @IsString()
  password: string
}
