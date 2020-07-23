import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToDo } from 'src/app/list-to-dos/list-to-dos.component';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(
    private http:HttpClient
  ) { }


  // Method to retrieve the list of todos.
  retrieveAllTodos(username) {
    return this.http.get<ToDo[]>(`http://localhost:8080/users/${username}/todos`); // observable helps define what you want, but need to subscribe to inboke.
  }

  retrieveTodo(username, id) {
    return this.http.get<ToDo>(`http://localhost:8080/users/${username}/todos/${id}`);
  }

  deleteTodo(username, id) {
    return this.http.delete(`http://localhost:8080/users/${username}/todos/${id}`);
  }

}
