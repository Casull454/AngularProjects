// todos.component.ts

import { Component, OnInit } from '@angular/core';
// Import a service:
import { TodoService } from '../../services/todo.service'
// Import the Todo model:
import { Todo } from '../../models/Todo';

@Component({
  selector: 'app-todos',  // The selector string is the name of the root tag for this component. <app-todos>
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})

export class TodosComponent implements OnInit {

  todos:Todo[];

  // Dependency Inject a service into the constructor.
  // Constructors are generally where we set up services.

  //  We can now use the TodoService anywhere in this class 
  constructor(private todoService:TodoService) { }


  // 
  ngOnInit() {

    // Get Todos from the service
    // Set our local "todos" array to the result we get back from the API call:
    this.todoService.getTodos().subscribe(todos => { this.todos = todos});
  }

  deleteTodo(todo:Todo) {
    console.log('delete in todos.component.ts');

    // For the UI, modify local todos array to flter out the one we are deleting:
    this.todos = this.todos.filter(t => t.id != todo.id);

    // Take care of deleting the todo on the sever, calling our server:
    this.todoService.deleteTodo(todo).subscribe();
  }

  addTodo(todo:Todo) {
    // We'll make a post request to the service and get an Observable back
    this.todoService.addTodo(todo).subscribe(todo => {
      // Push the new todo onto existing local array of todos:
      this.todos.push(todo);
    })
  }


}
