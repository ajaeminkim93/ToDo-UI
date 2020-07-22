import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component'; // this is how to import a component
import { ActivatedRoute } from '@angular/router';
import { WelcomeDataService } from '../service/data/welcome-data.service';

// decorator
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit { // export makes it "public".

  // in JS
  name = ''
  message = 'Some welcome message'
  welcomeMessageFromService:String;
  // in Java
  // String message = "Some welcome Message";
  // in TS you can add type
  // message : string = 'Some welcome message'

  // Activated Route, need to know which route is active.
  constructor(
    private route:ActivatedRoute,
    private service:WelcomeDataService) { 

  }

  ngOnInit() { // : void means its the return type
    // console.log(this.message)
    //console.log(this.route.snapshot.params['name'])
    this.name = this.route.snapshot.params['name']
  }


  getWelcomeMessage() {
    // console.log(this.service.executeHelloWorldBeanService());
    this.service.executeHelloWorldBeanService().subscribe(// subscribe
      response => this.handleSuccessfulResponse(response),
      error => this.handleErrorResponse(error)); 

    // console.log(' last line of getwelcome');
  }

  getWelcomeMessageWithParameter() {
    // console.log(this.service.executeHelloWorldBeanService());
    this.service.executeHelloWorldServiceWithPathVariable(this.name).subscribe(// subscribe
      response => this.handleSuccessfulResponse(response),
      error => this.handleErrorResponse(error)); 

    // console.log(' last line of getwelcome');
  }

  handleSuccessfulResponse(response) {
    this.welcomeMessageFromService = response.message;
  }

  handleErrorResponse(error) {
    // console.log(error);
    // console.log(error.error);
    // console.log(error.error.message);
    this.welcomeMessageFromService = error.error.message;
  }
}
