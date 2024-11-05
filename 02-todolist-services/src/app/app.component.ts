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
  public isDoneListOpen: boolean;

  constructor() {
    this.isNewDialogOpen = false;
    this.openTodos = [];
    this.doneTodos = [];
    this.newTodo = "";
    this.isDoneListOpen = false;
  }

  onClickNew():void {
    this.isNewDialogOpen = true;
  }

  deleteTodos():void {
    this.doneTodos = [];
  }

  onClickCancel():void {
    this.isNewDialogOpen = false;
  }

  onClickSave():void {
    this.openTodos.push(this.newTodo);
    this.newTodo = '';
    this.isNewDialogOpen = false;
  }

  onSelectOpenTodo(todo: string) {
    this.openTodos = this.openTodos.filter((t) => t !== todo);
    this.doneTodos.push(todo);
  }

  onSelectDoneTodo(todo: string) {
    this.doneTodos = this.doneTodos.filter((t) => t !== todo);
    this.openTodos.push(todo);
  }

  onClickDoneListTitle(){
    this.isDoneListOpen = !this.isDoneListOpen;
  }
}
