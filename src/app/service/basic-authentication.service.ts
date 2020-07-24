import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { API_URL } from './../app.constants';

export const TOKEN = 'token'
export const AUTHENTICATED_USER = 'authenticatedUser'


@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  constructor(private  http: HttpClient) { }


  executeJWTAuthenticationService(username, password) { // pass in username amd password
 

    return this.http.post<any>(`${API_URL}/authenticate`, {username, password}) // execute
      .pipe( // pipe means we do it if it succeeds
        map(
          data => { // if there is a valid response then set something into session and return data
            sessionStorage.setItem(AUTHENTICATED_USER, username);
            sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);
            return data
          }
        )
      );
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
            sessionStorage.setItem(AUTHENTICATED_USER, username);
            sessionStorage.setItem(TOKEN, basicAuthHeaderString);
            return data
          }
        )
      );
  }


  getAuthenticatedUser() {
    return sessionStorage.getItem(AUTHENTICATED_USER);
  }

  getAuthenticatedToken() {
    if(this.getAuthenticatedUser())
      return sessionStorage.getItem(TOKEN);
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(AUTHENTICATED_USER);
    return !(user === null);
  }

  logout() {
    sessionStorage.removeItem(AUTHENTICATED_USER);
    sessionStorage.removeItem(TOKEN);
  }

}


export class AuthenticationBean {
  constructor(public message:string) {}
}