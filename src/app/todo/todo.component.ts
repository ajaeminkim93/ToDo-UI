import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { ToDo } from '../list-to-dos/list-to-dos.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  id:number;
  todo: ToDo;

  constructor(
    private todoService:TodoDataService,
    private route:ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.todo = new ToDo(this.id, '', false, new Date());

    if(this.id != -1) {
      this.todoService.retrieveTodo('ajmk93', this.id).subscribe(data => this.todo = data);
    }
  }

  saveTodo() {
    if(this.id === -1) {
      // create todo
      this.todoService.createTodo('ajmk93', this.todo)
      .subscribe(
        data => {
          console.log(data);
          this.router.navigate(['todos']);
        });
    } else {
      this.todoService.updateTodo('ajmk93', this.id, this.todo)
      .subscribe(
        data => {
          console.log(data);
          this.router.navigate(['todos']);
        });
    }
  }

}
