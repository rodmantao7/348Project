import { NotFoundException } from '@nestjs/common'

export class UsernamePasswordException extends NotFoundException {
  constructor(objectOrError?: string | object | any) {
    super(objectOrError, { description:'username or password is incorrect' })
  }
}