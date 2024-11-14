import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { BehaviorSubject, combineLatest, filter, map, Observable, tap } from 'rxjs';
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
  selectedTodo?: Todo;

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

  get isNewDialogOpen$(): Observable<boolean> {
    return combineLatest([
      this.dialogService.isOpen$,
      this.dialogService.state$,
    ]).pipe(
      filter(([isOpen, state]) => isOpen && state === 'new'),
      map((_) => true)
    );
  }

  get isEditDialogOpen$(): Observable<boolean> {
    return combineLatest([
      this.dialogService.isOpen$,
      this.dialogService.state$,
    ]).pipe(
      filter(([isOpen, state]) => isOpen && state === 'edit'),
      map((_) => true)
    );
  }

  onClickDoneListTitle() {
    this.isDoneListOpen$.next(!this.isDoneListOpen$.getValue());
  }

  onClickNewTodo() {
    this.dialogService.setState('new');
    this.dialogService.setIsOpen(true);
  }

  onCloseDialog() {
    this.dialogService.setIsOpen(false);
  }

  onCreateTodo(title: string) {
    this.todoService.newTodoByTitle(title);
  }

  onClickTodo(todo: Todo) {
    console.log('onclick', todo)
    this.selectedTodo = todo;
    this.dialogService.setState('edit');
    this.dialogService.setIsOpen(true);
  }

  onEditTodo(todo: Todo) {
    this.todoService.updateTodo(todo);
    this.dialogService.setIsOpen(false);
  }
}
