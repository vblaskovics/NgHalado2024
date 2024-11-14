import { Directive, ElementRef, HostListener } from '@angular/core';
import { DialogService } from '../services/dialog.service';

@Directive({
  selector: '[appClickOutside]',
})
export class ClickOutsideDirective {
  constructor(private el: ElementRef, private dialogService:DialogService) {}

  // TODO: függetlenítsd a dialog copmonent működésétől ezt a direktívát
  @HostListener('document:click', ['$event', '$event.target'])
  onClick(event: MouseEvent, targetElement: HTMLElement): void {
    if (this.el.nativeElement.hasAttribute('open') && !this.el.nativeElement.contains(targetElement)) {
      // click outside
      this.dialogService.setIsOpen(false);
    }
  }
}
