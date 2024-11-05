import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  BehaviorSubject,
  filter,
  interval,
  map,
  Observable,
  Observer,
  share,
  Subject,
  takeWhile,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input() numberOfTodos: number = 0;
  timer: Observable<number> = interval(1000).pipe(
    tap((v) => console.log('tap', v)),
    // map((v) => {
    //   if (v === 4) {
    //     throw new Error('Random error message')
    //   }
    //   return v;
    // }),
    // map((v) => v * v),
    filter((v) => v % 2 === 0),
    // takeWhile((v) => v < 100),
    share()
  );

  timerSubject: Subject<number> = new Subject();

  storedValue: BehaviorSubject<number> = new BehaviorSubject(0);

  ngOnInit() {
    const timerObserver: Observer<number> = {
      next: (v) => console.log('stream event', v),
      error: (e) => console.log('stream error', e),
      complete: () => console.log('stream completed'),
    };

    this.timer.subscribe(timerObserver);

    this.timer.subscribe(this.timerSubject);
  }

  onClick() {
    this.storedValue.next(this.storedValue.getValue() + 1);
  }
}
