import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  WritableSignal,
} from '@angular/core';
import { TodoService } from './services/todo.service';
import { map, Observable } from 'rxjs';
import { AnalyticsService } from './services/analytics.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  public newTodo: string;

  constructor(
    public todoService: TodoService,
    public analyticsService: AnalyticsService
  ) {
    this.newTodo = '';
  }

  ngOnInit() {
    this.todoService.fetchAllTodos();
  }

  get openTodosCount$(): Observable<number> {
    return this.todoService.openTodos$.pipe(map((todos) => todos.length));
  }

  get eventLog(): WritableSignal<number> {
    return this.analyticsService.getEventLog();
  }

  get eventLog2(): Signal<number> {
    return this.analyticsService.eventLog2;
  }

  // onClickSave():void {
  //   this.todoService.newTodoByTitle(this.newTodo);
  //   this.newTodo = '';
  // }
}
