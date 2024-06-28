import { HttpHandlerFn, HttpInterceptorFn } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { AuthService } from '../../_services/auth/auth.service';
import { inject } from '@angular/core';

export function authInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn){
  const auth = inject(AuthService); 
  const token = auth.getUserToken(); 

  if(token){
    request = request.clone({
      setHeaders: {
        Authorization: 'Bearer ' + token 
      }
    })
  } 

  return next(request); 
}
