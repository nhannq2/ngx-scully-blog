import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent {
  @Input()
  searchTerm: string = ''
  @Output()
  search = new EventEmitter<string>()

  constructor() {
  }

  doSearch(searchTerm: string) {
    this.search.emit(searchTerm)
  }
}
