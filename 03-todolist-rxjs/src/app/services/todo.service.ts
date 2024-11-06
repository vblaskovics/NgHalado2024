import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Todo } from '../types/todo';

let todoIdCounter = 0;

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todoStore: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([
    { id: '1', title: 'Todo 1', completed: false },
    { id: '2', title: 'Todo 2', completed: false },
    { id: '3', title: 'Todo 3', completed: true },
  ]);

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

  public openTodos: string[] = [];
  public doneTodos: string[] = [];

  constructor() {}

  getOpenTodos() {
    return this.openTodos;
  }

  getDoneTodos() {
    return this.doneTodos;
  }

  deleteTodos(): void {
    this.doneTodos = [];
  }

  deleteCompletedTodos(): void {
    this.todoStore.next(this.todoState.filter((t) => !t.completed));
  }

  newTodoByTitle(title: string): void {
    const newTodo: Todo = {
      id: `${todoIdCounter++}`,
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
}
