import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CATEGORIES } from '../../../../../../configuration';

@Component({
  selector: 'app-blog-categories',
  templateUrl: './blog-categories.component.html',
  styleUrls: ['./blog-categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogCategoriesComponent {
  constructor() {}
  categories = CATEGORIES
}
