import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

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
      imports: [RouterModule.forRoot([])],
      declarations: [AppComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    newBtn = fixture.debugElement.query(By.css('[data-testid="new-btn"]'));
    dialog = fixture.debugElement.query(By.css('dialog'));
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



});
