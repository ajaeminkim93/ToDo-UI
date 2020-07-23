import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Router } from '@angular/router';
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

  message: string;


  constructor(
    private todoService:TodoDataService,
    private router:Router
  ) { }

  ngOnInit() {
    this.refreshTodos();
  }

  refreshTodos() {
    this.todoService.retrieveAllTodos('ajmk93').subscribe(
      response => {
        console.log(response);
        this.todos = response;
      }
    );
  }

  updateTodo(id) {
    this.router.navigate(['todos', id]);
    console.log(`update ${id}`);
  }

  deleteTodo(id) {
    console.log(`delete todo ${id}`);
    this.todoService.deleteTodo('ajmk93', id).subscribe(
      response => {
        console.log(response);
        this.message = `You have successfully deleted ToDo ${id}`;
        this.refreshTodos();
      }
    )
  }

}
