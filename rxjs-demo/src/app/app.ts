import { Component, signal, OnDestroy} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable, Subscription, interval} from 'rxjs';
import { RxjsOperatorComponent } from './rxjs-operator-component/rxjs-operator-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RxjsOperatorComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnDestroy {
  protected readonly title = signal('rxjs-demo');

  currentValue = 0;
  private subscription: Subscription | null = null;

  startTimer() {
    // interval() har second ek value emit karta hai
    const timer$ = interval(1000);

    this.subscription = timer$.subscribe({
      next: (val) => {
        this.currentValue = val;
        console.log('Value:', val);
      },
      error: (err) => console.log('Error:', err),
      complete: () => console.log('Done!')
    });
  }

  stopTimer() {
    // Unsubscribe — stream band karo (memory leak rokne ke liye)
    this.subscription?.unsubscribe();
    console.log('Timer stopped!');
  }

  ngOnDestroy() {
    // Component destroy ho to bhi unsubscribe karo
    this.subscription?.unsubscribe();
  }

}
