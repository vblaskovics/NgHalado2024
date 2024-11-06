import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Todo } from '../../types/todo';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrl: './page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageComponent {
  isDoneListOpen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  @Output() openNewTodoDialog: EventEmitter<void> = new EventEmitter();

  constructor(public todoService: TodoService) {
  }

  get openTodos$(): Observable<Todo[]> {
    return this.todoService.openTodos$;
  }

  get doneTodos$(): Observable<Todo[]> {
    return this.todoService.doneTodos$;
  }

  onClickDoneListTitle() {
    this.isDoneListOpen$.next(!this.isDoneListOpen$.getValue());
  }
}
