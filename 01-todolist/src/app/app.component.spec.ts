import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';
import { Component, DebugElement, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  template: ''
})
class MockTodoListComponent {
  @Input() todos: string[] = [];
  @Output() clickTodo: EventEmitter<string> = new EventEmitter<string>();
}

let fixture: ComponentFixture<AppComponent>;
let component: AppComponent;

let newBtn: DebugElement;
let deleteBtn: DebugElement;
let openList: DebugElement;
let dialog: DebugElement;

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([]), FormsModule],
      declarations: [AppComponent, MockTodoListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    newBtn = fixture.debugElement.query(By.css('[data-testid="new-btn"]'));
    deleteBtn = fixture.debugElement.query(By.css('[data-testid="delete-btn"]'));
    dialog = fixture.debugElement.query(By.css('dialog'));
    openList = fixture.debugElement.query(By.css('[data-testid="open-list"]'));
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have a title', () => {
    const title = fixture.debugElement.query(By.css('h1'));
    expect(title.nativeElement.textContent).toEqual('Feladat lista');
  });

  it('should render "Új feladat" button', () => {
    expect(newBtn).toBeTruthy();
  })

  it('should render "Delete" button', () => {
    expect(deleteBtn).toBeTruthy();
  })

  it('should not show "Új feladat létrehozása" dialog initially', () => {
    expect(dialog).withContext('Dialog should exist').toBeTruthy();
    expect('open' in dialog.attributes).toBeFalse();
  })

  it('should show "Új feladat létrehozása" dialog when "Új feladat" button has been clicked', () => {
    newBtn.triggerEventHandler('click');
    fixture.detectChanges();
    expect('open' in dialog.attributes).withContext('Dialog component should have the "open" attribute').toBeTrue();
  })

  it('should hide "Új feladat létrehozása" dialog when "Mégse" button has been clicked', () => {
    const cancelBtn = fixture.debugElement.query(By.css('[data-testid="cancel-btn"]'));
    cancelBtn.triggerEventHandler('click');
    fixture.detectChanges();
    expect('open' in dialog.attributes).withContext('Dialog component should not have the "open" attribute').toBeFalse();
  })

  it('should save the new todo input value', () => {
    component.isNewDialogOpen = true;
    component.openTodos = [];
    fixture.detectChanges();

    const inputDe = dialog.query(By.css('input'));
    expect(inputDe).withContext('input element should be defined').toBeTruthy();
    inputDe.triggerEventHandler('input', { target: { value: 'Task 1' }});
    const okBtn = dialog.query(By.css('[data-testid="ok-btn"]'));
    expect(okBtn).withContext('ok button element should be defined').toBeTruthy();
    okBtn.triggerEventHandler('click');
    fixture.detectChanges();

    expect(component.openTodos.includes('Task 1')).toBeTrue();
  })

  it('should hide and reset the dialog when new todo has been created', () => {
    component.isNewDialogOpen = true;
    component.newTodo = "Task 1";
    fixture.detectChanges();

    const okBtn = dialog.query(By.css('[data-testid="ok-btn"]'));
    expect(okBtn).withContext('ok button element should be defined').toBeTruthy();
    okBtn.triggerEventHandler('click');
    fixture.detectChanges();

    expect('open' in dialog.attributes).withContext('Dialog should be closed').toBeFalse();
    expect(component.newTodo).withContext("Dialog's state should be empty").toEqual('');
  })  

  it('should delete all todos in done when user clicks on delete button', () => {
    component.doneTodos = ['Todo 1', 'Todo 2'];
    fixture.detectChanges();
    
    deleteBtn.triggerEventHandler('click');
    fixture.detectChanges();

    expect(component.doneTodos.length).toBe(0);
  })

  it('should move todo to done list on click', () => {
    component.openTodos = ['Todo 1'];
    fixture.detectChanges();
    
    openList.triggerEventHandler('clickTodo', 'Todo 1');
    fixture.detectChanges();

    expect(component.openTodos.length).withContext('There should be no open todo').toEqual(0);
    expect(component.doneTodos[0]).withContext('"Todo 1" should be done').toEqual('Todo 1');
  })

  it('should render done todos', () => {
    component.doneTodos = ['Todo 1', 'Todo 2', 'Todo 3'];
    component.isDoneListOpen = true;
    fixture.detectChanges();
    
    const doneList = fixture.debugElement.query(By.css('[data-testid="done-list"]'));

    expect(doneList.children[0].nativeElement.textContent.trim()).toEqual('Todo 1');
    expect(doneList.children[1].nativeElement.textContent.trim()).toEqual('Todo 2');
    expect(doneList.children[2].nativeElement.textContent.trim()).toEqual('Todo 3');
  })

  it('should move todo to open list from done list on click', () => {
    component.doneTodos = ['Todo 1'];
    component.isDoneListOpen = true;
    fixture.detectChanges();

    const doneList = fixture.debugElement.query(By.css('[data-testid="done-list"]'));
    
    doneList.children[0].triggerEventHandler('click');
    fixture.detectChanges();

    expect(component.doneTodos.length).withContext('There should be no done todo').toEqual(0);
    expect(component.openTodos[0]).withContext('"Todo 1" should be open').toEqual('Todo 1');
  })

  it('should close done list in the beginning', () => {
    component.doneTodos = ['Todo 1'];
    fixture.detectChanges();
    
    const doneList =  fixture.debugElement.query(By.css('[data-testid="done-list"]'));
    
    expect(doneList).toBeFalsy();
  })
  
  it('should open done list on click', () => {
    component.doneTodos = ['Todo 1'];
    fixture.detectChanges();
    
    const doneListTitle =  fixture.debugElement.query(By.css('[data-testid="done-list-title"]'));
    doneListTitle.triggerEventHandler('click');
    fixture.detectChanges();

    const doneList =  fixture.debugElement.query(By.css('[data-testid="done-list"]'));
    expect(doneList).toBeTruthy();
  })

});
