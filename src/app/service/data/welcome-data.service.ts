import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core';


export class HelloWorldBean {
  constructor(public message:string) { }
}


@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {

  constructor(
    private http:HttpClient
  ) { }

  // Retrieve data from backend service
  executeHelloWorldBeanService() {
    return this.http.get<HelloWorldBean>('http://localhost:8080/hello-world-bean'); // observable helps define what you want, but need to subscribe to inboke.
  }

  executeHelloWorldServiceWithPathVariable(name) {
    let basicAuthHeaderString = this.createBasicAuthenticationHttpHeader();

    // create headers
    let headers = new HttpHeaders({
      Authorization: basicAuthHeaderString
    })

    return this.http.get<HelloWorldBean>(`http://localhost:8080/hello-world/path-variable/${name}`, {headers});
  }

  createBasicAuthenticationHttpHeader() {
    let username = 'ajmk93';
    let password = '123';
    let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);

    return basicAuthHeaderString;
  }
}
