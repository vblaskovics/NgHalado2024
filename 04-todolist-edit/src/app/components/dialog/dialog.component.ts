import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
})
export class DialogComponent {
  @Input() isOpen: boolean = false;
  @Output() close: EventEmitter<void> = new EventEmitter();

  protected closeDialog(): void {
    this.close.emit();
  }
}
