import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { ToDo } from '../list-to-dos/list-to-dos.component';
import { ActivatedRoute } from '@angular/router';

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
    private route:ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.todo = new ToDo(1, '', false, new Date());
    this.todoService.retrieveTodo('ajmk93', this.id).subscribe(data => this.todo = data);
  }

}
