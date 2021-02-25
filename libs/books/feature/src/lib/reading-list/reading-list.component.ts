import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { getReadingList, removeFromReadingList, markAsRead } from '@tmo/books/data-access';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);

  constructor(private readonly store: Store,
    private readonly _snackBar: MatSnackBar) {}

  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
  }

  markAsFinished(item) {
    this.store.dispatch(markAsRead({item: {...item, finished: true, finishedDate: new Date().toISOString()}}));
    this.openSnackBar({
      message: `Yay!!! You finished reading "${item.title}"`,
      options: {
        duration: 2000,
        verticalPosition: 'top'
      },
    });
  }

  openSnackBar(config: any) {
    const { message, action, options } = config;
    return this._snackBar.open(message, action, options)
  }
}