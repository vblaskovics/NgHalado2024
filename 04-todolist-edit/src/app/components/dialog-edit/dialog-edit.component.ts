import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';
import { Todo } from '../../types/todo';
import { FormControl, FormGroup, Validators } from '@angular/forms';

type EditForm = {
  title: FormControl<string>;
  completed: FormControl<boolean>;
};

@Component({
  selector: 'app-dialog-edit',
  templateUrl: './dialog-edit.component.html',
  styleUrl: './dialog-edit.component.css',
})
export class DialogEditComponent extends DialogComponent {
  @Input() todo?: Todo;
  @Output() edit: EventEmitter<Todo> = new EventEmitter<Todo>();

  editForm: FormGroup = new FormGroup<EditForm>({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    completed: new FormControl(false, { nonNullable: true }),
  });

  ngOnInit() {
    this.editForm.valueChanges.subscribe((formValue) => {
      console.log('editForm value change:', formValue);
    });
  }

  ngOnChanges() {
    this.editForm.patchValue({
      title: this.todo?.title,
      completed: this.todo?.completed,
    });
  }

  get isTitleInvalid(): boolean {
    return (
      (this.editForm.get('title')?.invalid &&
        this.editForm.get('title')?.touched) ||
      false
    );
  }
}
