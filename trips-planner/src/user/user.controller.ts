import {
  Controller,
  Post,
  Body,
} from '@nestjs/common'
import { UserService } from './user.service'
import { LoginUserDto } from './dto/login-user.dto'
import { RegisterUserDto } from './dto/register-user.dto'
import { User } from './entities/user.entity'
import { RequestUser } from './decorators/user.decorator'
import { Auth } from './decorators/auth.decorator'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto)
  }

  @Post('/signup')
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.userService.register(registerUserDto)
  }

  @Post('/logout')
  @Auth()
  logout(@RequestUser() user: User) {
    return this.userService.logout(user.userId)
  }
}
