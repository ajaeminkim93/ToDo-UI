import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';
import { BasicAuthenticationService } from '../service/basic-authentication.service';

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
  constructor(
    private router: Router, 
    private hardcodedAuthenticationServices: HardcodedAuthenticationService,
    private basicAuthenticationService: BasicAuthenticationService
    ) { 

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

  handleBasicAuthLogin() {
    this.basicAuthenticationService.executeAuthenticationService(this.username, this.password)
      .subscribe(
        data => {
          console.log(data)
          this.router.navigate(['welcome', this.username])
          this.invalidLogin = false
        },
        error => {
          console.log(error)
          this.invalidLogin = true
        }
      )  
  } // end of handleBasicAuthLogin()

}
