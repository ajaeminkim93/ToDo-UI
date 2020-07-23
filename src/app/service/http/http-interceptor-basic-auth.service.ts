import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorBasicAuthService implements HttpInterceptor{

  constructor() { }

  // interceptor acts like a filter
  // 1. intercept request.
  // 2. add authorization header.
  // 3. Sending it to the next http handler.
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    let username = 'ajmk93';
    let password = '123';
    let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);

    // clone the request and modify the header
    request = request.clone({
      setHeaders : {
        Authorization : basicAuthHeaderString
      }
    })
    
    return next.handle(request);
  }

}
