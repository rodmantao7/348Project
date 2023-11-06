import { Module } from '@nestjs/common';
import { FolderService } from './folder.service';
import { FolderController } from './folder.controller';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Folder } from './entities/folder.entity'
import { TripModule } from 'src/trip/trip.module'

@Module({
  imports: [TypeOrmModule.forFeature([Folder]), TripModule],
  controllers: [FolderController],
  providers: [FolderService],
})
export class FolderModule {}
