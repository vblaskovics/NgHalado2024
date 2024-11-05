import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {
  @Input() todos: string[] = [];
  @Output() clickTodo: EventEmitter<string> = new EventEmitter<string>();

  onClickTodo(todo:string) {
    this.clickTodo.emit(todo);
  }
}
