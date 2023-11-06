import { Injectable } from '@nestjs/common';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { Folder } from './entities/folder.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from 'src/user/entities/user.entity'
import { TripService } from 'src/trip/trip.service'

@Injectable()
export class FolderService {
  constructor(
    @InjectRepository(Folder)
    private readonly repository: Repository<Folder>,
    private tripService: TripService
  ) {
  }

  create(user: User, createFolderDto: CreateFolderDto) {
    const instance = this.repository.create({
      ...createFolderDto,
      user_id: user
    })
    return this.repository.save(instance)
  }

  findAll(user: User) {
    return this.repository.find({
      where:{
        user_id: user
      },
      order:{
        folderId: 'ASC'
      },
      relations: ['trips']
    })
  }

  async findOne(id: number) {
    return await this.repository.findOne({
      where:{
        folderId: id
      },
      relations: ['trips']
    });
  }

  async update(id: number, updateFolderDto: UpdateFolderDto) {
    const new_trips = (await this.findOne(id)).trips
    const index = new_trips.findIndex(trip => trip.tripId === +updateFolderDto.trip)
    index >-1 && new_trips.splice(index, 1)
    if(updateFolderDto.drop === 'copy'){
      const folder = await this.repository.preload({
        folderId: id,
        trips: [...new_trips, await this.tripService.findOne(+updateFolderDto.trip)]
      })
      return this.repository.save(folder)
    }else{
      const folder = await this.repository.preload({
        folderId: id,
        trips: [...new_trips]
      })
      return this.repository.save(folder)
    }
  }
}
