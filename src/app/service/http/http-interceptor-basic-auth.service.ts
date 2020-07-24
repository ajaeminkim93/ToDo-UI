import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { BasicAuthenticationService } from '../basic-authentication.service';


@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorBasicAuthService implements HttpInterceptor{

  constructor(
    private basicAuthenticationService:BasicAuthenticationService
  ) { }

  // interceptor acts like a filter
  // 1. intercept request.
  // 2. add authorization header.
  // 3. Sending it to the next http handler.
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    //let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);

    let basicAuthHeaderString = this.basicAuthenticationService.getAuthenticatedToken();
    let username = this.basicAuthenticationService.getAuthenticatedUser();


    if(basicAuthHeaderString && username) {    
    // clone the request and modify the header
      request = request.clone({
        setHeaders : {
          Authorization : basicAuthHeaderString
        }
      }) 
    }
    return next.handle(request);
  }

}
