import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  public isNewDialogOpen: boolean;
  public openList: string[];
  public newTodo: string;

  constructor() {
    this.isNewDialogOpen = false;
    this.openList = [];
    this.newTodo = "";
  }

  onClickNew():void {
    this.isNewDialogOpen = true;
  }

  onClickCancel():void {
    this.isNewDialogOpen = false;
  }

  onClickSave():void {
    this.openList.push(this.newTodo);
  }
}
