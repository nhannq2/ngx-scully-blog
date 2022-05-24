import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Route } from '@model';
import { BLOG_DEFAULT_COVER } from '@config';

@Component({
  selector: 'app-blog-item',
  templateUrl: './blog-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogItemComponent {
  @Input() route?: Route
  @Output() filterTag = new EventEmitter<string>()
  BLOG_DEFAULT_COVER = BLOG_DEFAULT_COVER
}
