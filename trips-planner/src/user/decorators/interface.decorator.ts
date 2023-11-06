import { applyDecorators, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { InterfaceGuard } from '../guards/interface.guard'

// export function Interface() {
//   return applyDecorators(
//     UseGuards(AuthGuard('jwt'), InterfaceGuard),
//   )
// }
