import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  forkJoin,
  interval,
  lastValueFrom,
  map,
  mergeMap,
  Observable,
  switchMap,
} from 'rxjs';
import { Todo } from '../types/todo';
import { HttpClient } from '@angular/common/http';
import { AnalyticsService } from './analytics.service';

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

  private timer$ = interval(3000);
  private fetchAllTodos$: Observable<Todo[]>;

  constructor(private httpClient: HttpClient, private analyticsService: AnalyticsService) {
    this.fetchAllTodos$ = this.httpClient.get<Todo[]>(`${API}`);

    this.timer$
      .pipe(switchMap(() => this.fetchAllTodos$))
      .subscribe((todos) => {
        this.todoStore.next(todos);
      });

    // this.timer$.subscribe(() => {
    //   this.fetchAllTodos$.subscribe((todos) =>{
    //     this.todoStore.next(todos);
    //   });
    // })
  }

  async deleteCompletedTodos(): Promise<void> {
    const deleteCalls: Observable<Todo>[] = this.todoState
      .filter((t) => t.completed)
      .map((t) => this.httpClient.delete<Todo>(`${API}/${t.id}`));
    await lastValueFrom(forkJoin(deleteCalls));

    this.todoStore.next(this.todoState.filter((t) => !t.completed));
  }

  async newTodoByTitle(title: string): Promise<void> {
    const newTodo: Partial<Todo> = {
      title: title,
      completed: false,
    };
    const todoRes = await lastValueFrom(
      this.httpClient.post<Todo>(API, newTodo)
    );

    this.todoStore.next([...this.todoState, todoRes]);
    this.analyticsService.addNewEvent();
  }

  // async completeTodo(todo: Todo) {
  //   const todoRes = await lastValueFrom(
  //     this.httpClient.put<Todo>(`${API}/${todo.id}`, { completed: true })
  //   );

  //   let updatedState = this.todoState.map((t) =>
  //     t.id === todoRes.id ? { ...todoRes } : t
  //   );
  //   this.todoStore.next(updatedState);
  // }

  // async reopenTodo(todo: Todo) {
  //   const todoRes = await lastValueFrom(
  //     this.httpClient.put<Todo>(`${API}/${todo.id}`, { completed: false })
  //   );

  //   let updatedState = this.todoState.map((t) =>
  //     t.id === todo.id ? { ...todoRes } : t
  //   );
  //   this.todoStore.next(updatedState);
  // }

  async updateTodo(todo: Todo) {
    await lastValueFrom(this.httpClient.put<Todo>(`${API}/${todo.id}`, todo));
    await this.fetchAllTodos();

    // const updateTodo$ = this.httpClient.put<Todo>(`${API}/${todo.id}`, todo);
    // updateTodo$.pipe(mergeMap((res) => this.fetchAllTodos$)).subscribe((todos: Todo[]) => {
    //   this.todoStore.next(todos);
    // });
  }

  async fetchAllTodos(): Promise<void> {
    const todos = await lastValueFrom(this.fetchAllTodos$);
    this.todoStore.next(todos);
  }
}
