import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrl: './page.component.css'
})
export class PageComponent {
  isDoneListOpen: boolean = false;

  @Input() openTodos: string[] = [];
  @Input() doneTodos: string[] = [];

  @Output() openNewTodoDialog: EventEmitter<void> = new EventEmitter();
  @Output() deleteTodos: EventEmitter<void> = new EventEmitter();
  @Output() selectOpenTodo: EventEmitter<string> = new EventEmitter();
  @Output() selectDoneTodo: EventEmitter<string> = new EventEmitter();

  onClickDoneListTitle(){
    this.isDoneListOpen = !this.isDoneListOpen;
  }
}
