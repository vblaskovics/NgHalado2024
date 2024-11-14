import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNewComponent } from './dialog-new.component';

describe('DialogNewComponent', () => {
  let component: DialogNewComponent;
  let fixture: ComponentFixture<DialogNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
