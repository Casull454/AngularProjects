import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { Todo } from '../models/Todo'

const httpOptions = { 
  headers: new HttpHeaders ({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  // Define the API endpoint from which to get todos:
  todosUrl:string = 'https://jsonplaceholder.typicode.com/todos';

  todosLimit = '?_limit=5';

  // Since we imported HttpClient above, we can inject it into our constructor:
  constructor(private http:HttpClient) { }

  getTodos():Observable<Todo[]> {

    // Get returns an Observable.
    // We need to bring in Observable from RXJS
    // Use Template Literal Syntax to assemble the URL string the way we want it (limited to 5 entries):
    return this.http.get<Todo[]>(`${this.todosUrl}${this.todosLimit}`);


    // Intially, we hard-code data to test everything out before going to actual API.
    // To replace with actual API call, we first have to add the HttpClientModule component to app.module.ts
    //
    // return [
    //   {
    //     id: 1,
    //     title: 'Todo One',
    //     completed: false
    //   },
    //   {
    //     id: 2,
    //     title: 'Todo Two',
    //     completed: true
    //   },
    //   {
    //     id: 3,
    //     title: 'Todo Three',
    //     completed: false
    //   }
    // ]

  }


  // Toggle Completed
  //   Put request is when you're actually updating something on the server:

  toggleCompleted(todo: Todo):Observable<any> {
    // We need to build a custom URL with Id since it is used to request a specific Todo:
    const url = `${this.todosUrl}/${todo.id}`;
    // httpOptions conatins the header of content type, whicj is needed
    return this.http.put(url, todo, httpOptions)
  }

  // Add Todo
  addTodo(todo:Todo):Observable<Todo> {
    // Make a post request:
    return this.http.post<Todo>(this.todosUrl, todo, httpOptions);
  }

  deleteTodo(todo:Todo):Observable<Todo> {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.delete<Todo>(url, httpOptions);
  }

  

   
}
