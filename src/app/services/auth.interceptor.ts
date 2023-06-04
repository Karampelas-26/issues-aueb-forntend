import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    
    
    if (token) {
      let storedToken = JSON.parse(token);
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${storedToken}`
        }
      });
    }
    
    return next.handle(request);
  }
}
