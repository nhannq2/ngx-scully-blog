import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CATEGORY_FILTER_TEXT, SEARCH_FOR_TEXT } from '@configuration';
import { ICategory } from 'src/app/models';

@Component({
  selector: 'app-blog-filters-info',
  templateUrl: './blog-filters-info.component.html',
  styleUrls: ['./blog-filters-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogFiltersInfoComponent {
  @Input() category: ICategory
  @Input() searchTerm: string
  searchForText = SEARCH_FOR_TEXT
  categoryFilterText = CATEGORY_FILTER_TEXT
}
