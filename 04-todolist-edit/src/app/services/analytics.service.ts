import {
  computed,
  effect,
  Injectable,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { EventLogRecord } from '../types/eventLogRecord';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  eventLog: WritableSignal<Array<EventLogRecord>> = signal([]);

  constructor() {
    console.log(this.eventLog());

    effect(() => {
      console.log('analytics effect', this.eventLog());
    });
  }

  getEventLog(): WritableSignal<Array<EventLogRecord>> {
    return this.eventLog;
  }

  addNewEvent() {
    this.eventLog.update((value) => [
      ...value,
      {
        timestamp: Date.now(),
        type: 'new-todo',
      },
    ]);
  }
}
