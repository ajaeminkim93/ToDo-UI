import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';

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



  // Router
  // Dependecy Injection
  constructor(private router: Router, private hardcodedAuthenticationServices: HardcodedAuthenticationService) { 

  }

  ngOnInit() {
  }

  handleLogin() {
    if(this.hardcodedAuthenticationServices.authenticate(this.username, this.password)){
      this.invalidLogin = false;
      // redirect to welcome page.
      this.router.navigate(['welcome', this.username])
    } else {
      this.invalidLogin = true;
    }
  }

}
