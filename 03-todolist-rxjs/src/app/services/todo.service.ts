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
    { id: '1', title: 'Todo 2', completed: false },
    { id: '1', title: 'Todo 3', completed: true },
  ]);

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

  newTodoByTitle(title: string): void {
    const newTodo: Todo = {
      id: `${todoIdCounter++}`,
      title: title,
      completed: false,
    };
    this.todoStore.next([...this.todoStore.getValue(), newTodo]);
  }

  finishTodo(todo: Todo) {
    // this.openTodos = this.openTodos.filter((t) => t !== todo);
    // this.doneTodos.push(todo);
  }

  reopenTodo(todo: Todo) {
    // this.doneTodos = this.doneTodos.filter((t) => t !== todo);
    // this.openTodos.push(todo);
  }
}
