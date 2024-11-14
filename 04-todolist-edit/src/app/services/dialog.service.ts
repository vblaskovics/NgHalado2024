import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DialogState } from '../types/dialogState';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  // Megjegyzés: isOpen és state lehete egy B.Subject is, most ez overkill, csak a tanulás kedvéért
  private _isOpen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  private _state$: BehaviorSubject<DialogState> =
    new BehaviorSubject<DialogState>('new');

  public isOpen$: Observable<boolean> = this._isOpen$.asObservable();
  public state$: Observable<DialogState> = this._state$.asObservable();

  constructor() {}

  setIsOpen(isOpen: boolean) {
    this._isOpen$.next(isOpen);
  }

  setState(state: DialogState) {
    this._state$.next(state);
  }
}
