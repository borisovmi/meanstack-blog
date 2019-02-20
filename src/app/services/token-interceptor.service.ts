import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(
    private _injector: Injector
  ) { }

  intercept(req, next) {
    let authservice = this._injector.get(AuthService);
    let tokenizedReq = req.clone({
      setHeaders: {
        'x-auth-token': authservice.getToken()
      }
    });
    return next.handle(tokenizedReq);
  }
}
