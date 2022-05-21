import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IPost } from 'src/app/models';
import { SEE_MORE_TEXT } from '@configuration';

@Component({
  selector: 'app-blog-post-item',
  templateUrl: './blog-post-item.component.html',
  styleUrls: ['./blog-post-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogPostItemComponent {
  @Input() post: IPost
  seeMoreText = SEE_MORE_TEXT
}
