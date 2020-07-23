import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  constructor(private  http: HttpClient) { }

  authenticate(username, password) {
    if(username === "ajmk93" && password === "123") {
      sessionStorage.setItem('authenticatedUser', username);
      return true;
    } else {
      return false;
    }
  }


  executeAuthenticationService(username, password) { // pass in username amd password
    let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password); // create basic auth string

    // create headers
    let headers = new HttpHeaders({
      Authorization: basicAuthHeaderString // set authstring as headers
    })

    return this.http.get<AuthenticationBean>(`http://localhost:8080/basicauth`, {headers}) // execute
      .pipe( // pipe means we do it if it succeeds
        map(
          data => { // if there is a valid response then set something into session and return data
            sessionStorage.setItem('authenticatedUser', username);
            return data
          }
        )
      );
  }







  isUserLoggedIn() {
    let user = sessionStorage.getItem('authenticatedUser');
    return !(user === null);
  }

  logout() {
    sessionStorage.removeItem('authenticatedUser');
  }

}


export class AuthenticationBean {
  constructor(public message:string) {}
}