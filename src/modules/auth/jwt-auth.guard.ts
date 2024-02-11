import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    console.log('Hello');
    try {
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (bearer !== 'Bearer' && !token)
        throw new UnauthorizedException({ message: "User don't authorized" });

      const user = this.jwtService.verify(token);
      req.user = user;

      return true;
    } catch (error) {
      throw new UnauthorizedException({ message: "User don't authorized" });
    }
  }

  constructor(private jwtService: JwtService) {}
}
