import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  public isNewDialogOpen: boolean;
  public openTodos: string[];
  public doneTodos: string[];
  public newTodo: string;

  constructor() {
    this.isNewDialogOpen = false;
    this.openTodos = [];
    this.doneTodos = [];
    this.newTodo = "";
  }

  onClickNew():void {
    this.isNewDialogOpen = true;
  }

  onClickCancel():void {
    this.isNewDialogOpen = false;
  }

  onClickSave():void {
    this.openTodos.push(this.newTodo);
    this.newTodo = '';
    this.isNewDialogOpen = false;
  }

  onClickOpenTodo(todo: string) {
    this.openTodos = this.openTodos.filter((t) => t !== todo);
    this.doneTodos.push(todo);
  }

  // onClickDoneTodo(todo: string) {
  //   this.doneTodos = this.openTodos.filter((t) => t !== todo);
  //   this.openTodos.push(todo);
  // }
}
