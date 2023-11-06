import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import { User } from 'src/user/entities/user.entity'

@Injectable()
export class InterfaceGuard implements CanActivate {
  constructor(private reflector: Reflector) { }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const user = context.switchToHttp().getRequest()?.user as User
    const reuqest = context.switchToHttp().getRequest()
    let interfaces = new Set()
    return [...interfaces].includes(`${reuqest.path}|${reuqest.method.toLowerCase()}`)
  }
}
