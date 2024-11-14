import { computed, effect, Injectable, Signal, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {

  eventLog: WritableSignal<number> = signal(0);

  eventLog2: Signal<number> = computed(() => this.eventLog() * 2);

  constructor() {
    console.log(this.eventLog())
    
    this.eventLog.set(1);
    
    setInterval(() => {
      this.eventLog.update(value => value + 1);
    }, 2000);

    effect(() => {
      console.log('analytics effect', this.eventLog());
    });
  }

  getEventLog():WritableSignal<number> {
    return this.eventLog;
  }

}
