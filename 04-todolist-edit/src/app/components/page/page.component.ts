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
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrl: './page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent {
  isNewDialogOpen: boolean = false;

  isDoneListOpen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor(
    public todoService: TodoService,
    private dialogService: DialogService
  ) {}

  get openTodos$(): Observable<Todo[]> {
    return this.todoService.openTodos$;
  }

  get doneTodos$(): Observable<Todo[]> {
    return this.todoService.doneTodos$;
  }

  get isDialogOpen$(): Observable<boolean> {
    return this.dialogService.isOpen$;
  }

  onClickDoneListTitle() {
    this.isDoneListOpen$.next(!this.isDoneListOpen$.getValue());
  }

  onClickNewTodo() {
    this.dialogService.setIsOpen(true);
  }

  onCloseDialog() {
    this.dialogService.setIsOpen(false);
  }

  onCreateTodo(title: string) {
    this.todoService.newTodoByTitle(title);
  }
}
