import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = 'ajmk93'
  password = ''
  errorMessage = 'Invalid Credentials!'
  invalidLogin = false;

  constructor() { }

  ngOnInit() {
  }

  handleLogin() {
    if(this.username === "ajmk93" && this.password === "123"){
      this.invalidLogin = false;
    } else {
      this.invalidLogin = true;
    }
    console.log(this.username);
    //console.log(this.password)
  }

}
