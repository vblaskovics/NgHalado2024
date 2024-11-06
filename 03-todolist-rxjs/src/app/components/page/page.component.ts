import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { map, Observable } from 'rxjs';
import { Todo } from '../../types/todo';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrl: './page.component.css',
})
export class PageComponent {
  isDoneListOpen: boolean = false;

  openTodoTitles$: Observable<string[]>;
  doneTodoTitles$: Observable<string[]>;

  @Output() openNewTodoDialog: EventEmitter<void> = new EventEmitter();

  constructor(public todoService: TodoService) {
    this.openTodoTitles$ = todoService.openTodos$.pipe(
      map((todos: Todo[]) => todos.map((todo) => todo.title))
    );

    this.doneTodoTitles$ = todoService.doneTodos$.pipe(
      map((todos: Todo[]) => todos.map((todo) => todo.title))
    );
  }

  onClickDoneListTitle() {
    this.isDoneListOpen = !this.isDoneListOpen;
  }
}
