import { Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom, map, Observable } from 'rxjs';
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
    const newTodo: Partial<Todo> = {
      title: title,
      completed: false,
    };
    this.httpClient.post<Todo>(API, newTodo).subscribe((todo: Todo) => {
      this.todoStore.next([...this.todoState, todo]);
    });
  }

  completeTodo(todo: Todo) {
    this.httpClient
      .put<Todo>(`${API}/${todo.id}`, { completed: true })
      .subscribe((todoRes: Todo) => {
        let updatedState = this.todoState.map((t) =>
          t.id === todoRes.id ? { ...todoRes } : t
        );
        this.todoStore.next(updatedState);
      });
  }

  async reopenTodo(todo: Todo) {
    const todoRes = await lastValueFrom(
      this.httpClient.put<Todo>(`${API}/${todo.id}`, { completed: false })
    );

    let updatedState = this.todoState.map((t) =>
      t.id === todo.id ? { ...todoRes } : t
    );
    this.todoStore.next(updatedState);
  }

  fetchAllTodos(): void {
    this.httpClient.get<Todo[]>(`${API}`).subscribe((todos) => {
      this.todoStore.next(todos);
    });
  }
}
