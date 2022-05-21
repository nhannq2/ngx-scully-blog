import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Post } from '@models';
import { RELATED_POSTS_SECTION_TITLE } from '@configuration';

@Component({
  selector: 'app-blog-related-posts',
  templateUrl: './blog-related-posts.component.html',
  styleUrls: ['./blog-related-posts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogRelatedPostsComponent {

  @Input() relatedPosts: Post[]

  title = RELATED_POSTS_SECTION_TITLE

}
