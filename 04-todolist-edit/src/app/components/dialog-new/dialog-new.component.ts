import { Component, EventEmitter, Output } from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-dialog-new',
  templateUrl: './dialog-new.component.html',
  styleUrl: './dialog-new.component.css'
})
export class DialogNewComponent extends DialogComponent {
  newTodoTitle = '';

  @Output() title: EventEmitter<string> = new EventEmitter<string>();

  onSave() {
    this.title.emit(this.newTodoTitle);
    this.closeDialog();
  }
}
