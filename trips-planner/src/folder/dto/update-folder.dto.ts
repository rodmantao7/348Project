import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateFolderDto } from './create-folder.dto';
import { IsString } from 'class-validator'

export class UpdateFolderDto extends PartialType(CreateFolderDto) {
  @ApiProperty({ default: '', required: true })
  @IsString()
  drop: string

  @ApiProperty({ default: '', required: true })
  @IsString()
  trip: string
}
