import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SEARCH_FOR_TEXT } from '@configuration';

@Component({
  selector: 'app-blog-filters-info',
  templateUrl: './blog-filters-info.component.html',
  styleUrls: ['./blog-filters-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogFiltersInfoComponent {
  @Input() searchTerm: string
  searchForText = SEARCH_FOR_TEXT
}
