import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';

let fixture: ComponentFixture<AppComponent>;
let component: AppComponent;

let newBtn: DebugElement;
let deleteBtn: DebugElement;
let openList: DebugElement;
let doneList: DebugElement;
let dialog: DebugElement;

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([]), FormsModule],
      declarations: [AppComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    newBtn = fixture.debugElement.query(By.css('[data-testid="new-btn"]'));
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
    component.openList = [];
    fixture.detectChanges();

    const inputDe = dialog.query(By.css('input'));
    expect(inputDe).withContext('input element should be defined').toBeTruthy();
    inputDe.triggerEventHandler('input', { target: { value: 'Task 1' }});
    const okBtn = dialog.query(By.css('[data-testid="ok-btn"]'));
    expect(okBtn).withContext('ok button element should be defined').toBeTruthy();
    okBtn.triggerEventHandler('click');
    fixture.detectChanges();

    expect(component.openList.includes('Task 1')).toBeTrue();
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

  it('should render open todos', () => {
    component.openList = ['Todo 1', 'Todo 2', 'Todo 3'];
    fixture.detectChanges();

    expect(openList.children[0].nativeElement.textContent.trim()).toEqual('Todo 1');
    expect(openList.children[1].nativeElement.textContent.trim()).toEqual('Todo 2');
    expect(openList.children[2].nativeElement.textContent.trim()).toEqual('Todo 3');
  })

});
