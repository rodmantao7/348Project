import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './entities/user.entity'
import { LoginUserDto } from './dto/login-user.dto'
import { JwtService } from '@nestjs/jwt'
import * as argon2 from 'argon2'
import { RegisterUserDto } from './dto/register-user.dto'
import { UsernamePasswordException } from 'src/common/exceptions/login.exception'
import *  as dayjs from 'dayjs'
import * as UTC from 'dayjs/plugin/utc'
import { Status } from './enum/status'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
    private readonly jwt: JwtService,
  ) {
    dayjs.extend(UTC)
  }

  async findOne(id: number) {
    const instance = await this.repository.findOne({
      where: { userId: id },
    })
    if (!instance) {
      throw new NotFoundException(`instance #${id} not found`)
    }
    delete instance.password
    return instance
  }

  async login(loginUserDto: LoginUserDto) {
    const { username, password } = loginUserDto
    const user = await this.repository.findOne({
      where: [{username}, {email: username}],
    })
    if (!user) {
      throw new UsernamePasswordException(`User ${username} or password incorrect`)
    }
    const psMatch = await argon2.verify(user.password, password)
    if (!psMatch) {
      throw new UsernamePasswordException(`User ${username} or password incorrect`)
    } else {
      user.status = Status.ONLINE
      this.repository.save(user)
      return this.token(user)
    }
  }

  async register(registerUserDto: RegisterUserDto) {
    const instance = this.repository.create({
      ...registerUserDto,
      password: await argon2.hash(registerUserDto.password),
    })
    return this.repository.save(instance)
  }

  async logout(id: number) {
    const instance = await this.findOne(id)
    if (instance) {
      instance.status = Status.OFFLINE
      this.repository.save(instance)
      return { msg: 'logout success' }
    } else {
      return new NotFoundException('User is not isExist')
    }
  }

  private async token(user: User) {
    return {
      token: await this.jwt.signAsync({
        username: user.username,
        sub: user.userId,
      }),
    }
  }
}
