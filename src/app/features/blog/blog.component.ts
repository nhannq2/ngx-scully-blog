import { Component } from '@angular/core';
import { BLOG_INFO } from 'configuration';
import { GlobalService, PostService } from '../../services';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent {
  blogTitle = BLOG_INFO.DEFAULT_TITLE
  blogDesc = BLOG_INFO.DESCRIPTION
  constructor(
    public postService: PostService,
    public globalService: GlobalService
  ) {}

}
