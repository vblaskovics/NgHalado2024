import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TodoService } from './services/todo.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  public newTodo: string;

  constructor(public todoService:TodoService) {

    this.newTodo = "";
  }

  ngOnInit() {
    this.todoService.fetchAllTodos();
  }

  get openTodosCount$(): Observable<number> {
    return this.todoService.openTodos$.pipe(map(todos => todos.length));
  }

  // onClickSave():void {
  //   this.todoService.newTodoByTitle(this.newTodo);
  //   this.newTodo = '';
  // }

}
