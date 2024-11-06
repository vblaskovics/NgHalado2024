import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Todo } from '../types/todo';
import { HttpClient } from '@angular/common/http';

let todoIdCounter = 0;

const API = 'http://localhost:3000/todos';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todoStore: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);

  get todoState(): Todo[] {
    return this.todoStore.getValue();
  }

  public openTodos$: Observable<Todo[]> = this.todoStore.pipe(
    map((todos: Todo[]) => {
      return todos.filter((t) => !t.completed);
    })
  );

  public doneTodos$: Observable<Todo[]> = this.todoStore.pipe(
    map((todos: Todo[]) => {
      return todos.filter((t) => t.completed);
    })
  );

  constructor(private httpClient: HttpClient) {}

  deleteCompletedTodos(): void {
    this.todoStore.next(this.todoState.filter((t) => !t.completed));
  }

  newTodoByTitle(title: string): void {
    const newTodo: Todo = {
      id: todoIdCounter++,
      title: title,
      completed: false,
    };
    this.todoStore.next([...this.todoState, newTodo]);
  }

  completeTodo(todo: Todo) {
    let updatedState = this.todoState.map((t) =>
      t.id === todo.id ? { ...todo, completed: true } : t
    );
    this.todoStore.next(updatedState);
  }

  reopenTodo(todo: Todo) {
    let updatedState = this.todoState.map((t) =>
      t.id === todo.id ? { ...todo, completed: false } : t
    );
    this.todoStore.next(updatedState);
  }

  fetchAllTodos(): void {
    this.httpClient.get<Todo[]>(`${API}`).subscribe((todos) => {
      this.todoStore.next(todos);
    });
  }
}
