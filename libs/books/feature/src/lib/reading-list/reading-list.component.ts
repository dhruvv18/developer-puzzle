import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { getReadingList, removeFromReadingList } from '@tmo/books/data-access';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);

  constructor(private readonly store: Store) {}

  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
  }
}
