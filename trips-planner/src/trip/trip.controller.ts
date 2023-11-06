import { Controller, Get, Post, Body, Param } from '@nestjs/common'
import { TripService } from './trip.service'
import { CreateTripDto } from './dto/create-trip.dto'
import { Auth } from 'src/user/decorators/auth.decorator'
import { RequestUser } from 'src/user/decorators/user.decorator'
import { User } from 'src/user/entities/user.entity'

@Controller('trip')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Post()
  @Auth()
  create(@RequestUser() user: User ,@Body() createTripDto: CreateTripDto) {
    return this.tripService.create(user, createTripDto);
  }

  @Get()
  @Auth()
  findAll(@RequestUser() user: User) {
    return this.tripService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tripService.findOne(+id);
  }
}
