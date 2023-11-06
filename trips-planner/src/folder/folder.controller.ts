import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FolderService } from './folder.service';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { Auth } from 'src/user/decorators/auth.decorator'
import { RequestUser } from 'src/user/decorators/user.decorator'
import { User } from 'src/user/entities/user.entity'

@Controller('folder')
export class FolderController {
  constructor(private readonly folderService: FolderService) {}

  @Post()
  @Auth()
  create(@RequestUser() user: User, @Body() createFolderDto: CreateFolderDto) {
    return this.folderService.create(user, createFolderDto);
  }

  @Get()
  @Auth()
  findAll(@RequestUser() user: User) {
    return this.folderService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.folderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFolderDto: UpdateFolderDto) {
    return this.folderService.update(+id, updateFolderDto);
  }
}
