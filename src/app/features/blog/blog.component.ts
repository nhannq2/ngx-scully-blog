import { Component } from '@angular/core';
import { GlobalService, PostService } from '@services';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
})
export class BlogComponent {
  constructor(
    public postService: PostService,
    public globalService: GlobalService
  ) {}

}
