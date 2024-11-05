import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrl: './page.component.css'
})
export class PageComponent {
  isDoneListOpen: boolean = false;

  @Output() openNewTodoDialog: EventEmitter<void> = new EventEmitter();

  constructor(public todoService: TodoService) {}

  onClickDoneListTitle() {
    this.isDoneListOpen = !this.isDoneListOpen;
  }
}
