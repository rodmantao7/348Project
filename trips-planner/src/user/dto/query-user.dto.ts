import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class QueryAllUserDto {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  groups: string

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  username: string
}
