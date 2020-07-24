import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToDo } from 'src/app/list-to-dos/list-to-dos.component';
import { TODO_JPA_API_URL} from 'src/app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(
    private http:HttpClient
  ) { }


  // Method to retrieve the list of todos.
  retrieveAllTodos(username) {
    console.log(username);
    return this.http.get<ToDo[]>(`${TODO_JPA_API_URL}/users/${username}/todos`); // observable helps define what you want, but need to subscribe to inboke.
  }

  retrieveTodo(username, id) {
    return this.http.get<ToDo>(`${TODO_JPA_API_URL}/users/${username}/todos/${id}`);
  }

  deleteTodo(username, id) {
    return this.http.delete(`${TODO_JPA_API_URL}/users/${username}/todos/${id}`);
  }

  updateTodo(username, id, todo) {
    return this.http.put(`${TODO_JPA_API_URL}/users/${username}/todos/${id}`, todo);
  }

  createTodo(username, todo) {
    return this.http.post(`${TODO_JPA_API_URL}/users/${username}/todos`, todo);
  }
 

}
