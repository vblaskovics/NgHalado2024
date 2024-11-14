import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';
import { By } from '@angular/platform-browser';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should accept an array of todos', () => {
    fixture.componentRef.setInput('todos', ['Task 1', 'Task 2']);

    expect(component.todos[0]).toBe('Task 1');
    expect(component.todos[1]).toBe('Task 2');
  });

  it('should render todos in a list', () => {
    fixture.componentRef.setInput('todos', ['Task 1', 'Task 2']);
    fixture.detectChanges();

    const listContainer = fixture.debugElement.query(
      By.css('[data-testid="todo-list-container"]')
    );

    expect(listContainer.children[0].nativeElement.textContent.trim()).toEqual(
      'Task 1'
    );
    expect(listContainer.children[1].nativeElement.textContent.trim()).toEqual(
      'Task 2'
    );
  });

  it('should emmit an event when user clicks on todo item', () => {
    fixture.componentRef.setInput('todos', ['Task 1', 'Task 2']);
    fixture.detectChanges();
    
    const firstTodo = fixture.debugElement.query(
      By.css('[data-testid="todo-list-container"] > :first-child')
    );
    
    spyOn(component.clickTodo, 'emit');

    firstTodo.triggerEventHandler('click');
    fixture.detectChanges();

    expect(component.clickTodo.emit).toHaveBeenCalledWith('Task 1');
  });
});
