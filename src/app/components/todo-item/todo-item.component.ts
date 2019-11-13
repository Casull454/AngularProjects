// EventEmitter and output are needed in Delete to communicate ("emit") the delete request
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TodoService } from '../../services/todo.service';

// Import the Todo model:
import { Todo } from 'src/app/models/Todo';
// import { totalmem } from 'os';


@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  // Input property, declared as an item of the Todo model: 
  @Input() todo: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter(); // Emit a Todo to parent component
                                                                 // Must be caught by the parent compopnent (todos.component.html).

  constructor(private TodoService:TodoService) { }

  ngOnInit() {
  }

  // Set dynamic classes:
  setClasses() {
    let classes = {
      todo: true,
      // The "this.todo.completed" pertains to the todo that was passed in as the Input
      // "is-complete" s/b 1:1 with the component CSS definition:
      'is-complete': this.todo.completed
    } 
    return classes;
  }

  // The "todo" we get comes from the todo-item.component.html.
  //   In that HTML, we defined the "onToggle", hooked to the "change" event from the input checkbox:
  //
  onToggle(todo) {
    console.log('toggle');
    // Toggle Makes change only in the UI (not on the server):
    todo.completed = !todo.completed;

    // Toggle - Update the server. We get back an Observable, so we need to subscribe to it:
    this.TodoService.toggleCompleted(todo).subscribe(todo => console.log(todo));
  }

  onDelete(todo) {
    console.log('todo-item.component.ts delete');
    this.deleteTodo.emit(todo);

  }




}
