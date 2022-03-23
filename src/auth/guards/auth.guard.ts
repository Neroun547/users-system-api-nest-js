import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { secretJwt } from "../../../config.json"; 
import * as jwt from "jsonwebtoken";

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
      ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        
        try {
            jwt.verify(request.cookies["token"], secretJwt);

            return true;
        } catch {
            return false;
        }
    }
}
