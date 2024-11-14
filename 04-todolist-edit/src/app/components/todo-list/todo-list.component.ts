import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../types/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {
  @Input() todos: Todo[] = [];
  @Output() clickTodo: EventEmitter<Todo> = new EventEmitter<Todo>();

  onClickTodo(todo:Todo) {
    this.clickTodo.emit(todo);
  }
}
