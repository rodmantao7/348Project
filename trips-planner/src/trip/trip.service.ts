import { ConflictException, Injectable } from '@nestjs/common'
import { CreateTripDto } from './dto/create-trip.dto'
import *  as dayjs from 'dayjs'
import { Trip } from './entities/trip.entity'
import * as UTC from 'dayjs/plugin/utc'
import { LessThan, MoreThan, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/user/entities/user.entity'
@Injectable()
export class TripService {
  constructor(
    @InjectRepository(Trip)
    private readonly repository: Repository<Trip>,
  ) {
    dayjs.extend(UTC)
  }
  async create(user: User, createTripDto: CreateTripDto) {
    const total = await this.repository.count({
      where: {
        user_id: user
      }
    })
    const total1 = await this.repository.count({
      where: [{
        user_id: user,
        departure_date: MoreThan(createTripDto.return_date)
      },{
        user_id: user,
        return_date: LessThan(createTripDto.departure_date)
      }]
    })
    if (total != total1) {
      throw new ConflictException('Date conflict')
    }
    const instance = this.repository.create({
      ...createTripDto,
      departure_date: dayjs(createTripDto.departure_date).format('YYYY-MM-DD'),
      return_date: dayjs(createTripDto.return_date).format('YYYY-MM-DD'),
      user_id: user
    })
    return this.repository.save(instance)
  }

  findAll(user: User) {
    return this.repository.find({
      where: {
        user_id: user
      },
      order: {
        tripId: 'ASC'
      }
    })
  }

  findOne(id: number) {
    return this.repository.findOne({
      where: {
        tripId: id
      }
    });
  }
}
