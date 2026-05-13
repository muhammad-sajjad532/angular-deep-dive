import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { filter, map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-rxjs-operator-component',
  imports: [ReactiveFormsModule],
  templateUrl: './rxjs-operator-component.html',
  styleUrls: ['./rxjs-operator-component.scss'],
})
export class RxjsOperatorComponent implements OnInit {
  searchControl = new FormControl('');
  searchTerm = '';

  numbers$ = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

  constructor() {
    this.searchControl.valueChanges.pipe(
      debounceTime(500),         // 500ms ruko — user type karna band kare tab
      distinctUntilChanged()     // agar value same hai toh dobara mat bhejo
    ).subscribe(value => {
      this.searchTerm = value ?? '';
      console.log('API call karo:', value);
      // yahan HTTP call hoti real app mein
    });
  }

  transformedNumbers$ = this.numbers$.pipe(
    filter((num: number) => num % 2 === 0),
    map((num: number) => num * 10)
  );

  ngOnInit(): void {
    this.transformedNumbers$.subscribe(val => console.log('Transformed Value:', val));
  }
}
