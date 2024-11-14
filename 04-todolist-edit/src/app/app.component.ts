import {
  ChangeDetectionStrategy,
  Component,
  computed,
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
  
  public eventLogText = computed(() => {
    const eventLog = this.analyticsService.eventLog;
    const newCount = eventLog().filter((log) => log.type === 'new-todo').length;
    const editCount = eventLog().filter((log) => log.type === 'edit-todo').length;
    const deleteCount = eventLog().filter((log) => log.type === 'delete-todos').length;
    return `New: ${newCount} | Edit: ${editCount} | Delete: ${deleteCount}`;
  });

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

  // onClickSave():void {
  //   this.todoService.newTodoByTitle(this.newTodo);
  //   this.newTodo = '';
  // }
}
