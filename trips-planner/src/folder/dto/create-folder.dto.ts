import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class CreateFolderDto {
  @ApiProperty({ default: '', required: true })
  @IsString()
  name: string
}
