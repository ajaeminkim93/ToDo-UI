import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';

export class ToDo {

  constructor(
    public id: number,
    public description: string,
    public done: boolean,
    public targetDate: Date
    
  ) {}

}

@Component({
  selector: 'app-list-to-dos',
  templateUrl: './list-to-dos.component.html',
  styleUrls: ['./list-to-dos.component.css']
})
export class ListToDosComponent implements OnInit {

  todos: ToDo[]
  // = [
  //   new ToDo(1, 'Learn Angular.', false, new Date()),
  //   new ToDo(2, 'Learn Java.', false, new Date()),
  //   new ToDo(3, 'Learn Spring Boot.', false, new Date())
  // ]

  constructor(
    private todoService:TodoDataService
  ) { }

  ngOnInit() {
    this.todoService.retrieveAllTodos('ajmk93').subscribe(
      response => {
        console.log(response);
        this.todos = response;
      }
    );
  }

}
