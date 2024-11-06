import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TodoService } from './services/todo.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  public isNewDialogOpen: boolean;
  public newTodo: string;

  constructor(public todoService:TodoService) {
    this.isNewDialogOpen = false;
    this.newTodo = "";
  }

  get openTodosCount$(): Observable<number> {
    return this.todoService.openTodos$.pipe(map(todos => todos.length));
  }

  onClickNew():void {
    this.isNewDialogOpen = true;
  }

  onClickCancel():void {
    this.isNewDialogOpen = false;
  }

  onClickSave():void {
    this.todoService.newTodoByTitle(this.newTodo);
    this.newTodo = '';
    this.isNewDialogOpen = false;
  }

}
