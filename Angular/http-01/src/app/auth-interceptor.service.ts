import { HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export class AuthInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler){
    const modifiedReq = req.clone({headers: req.headers.append('Auth', 'auth-key-here')})
    return next.handle(modifiedReq);
  }
}
