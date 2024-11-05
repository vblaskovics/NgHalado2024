import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  public openTodos: string[] = [];
  public doneTodos: string[] = [];

  constructor() { }

  deleteTodos():void {
    this.doneTodos = [];
  }

  newTodo(todo: string) {
    this.openTodos.push(todo);
  }

  finishTodo(todo: string) {
    this.openTodos = this.openTodos.filter((t) => t !== todo);
    this.doneTodos.push(todo);
  }

  reopenTodo(todo: string) {
    this.doneTodos = this.doneTodos.filter((t) => t !== todo);
    this.openTodos.push(todo);
  }

}
