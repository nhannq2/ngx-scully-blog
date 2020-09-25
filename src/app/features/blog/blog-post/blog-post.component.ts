import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GlobalService, PostService, SEOService } from 'src/app/services';


declare var ng: any;

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss'],
  preserveWhitespaces: true,
  encapsulation: ViewEncapsulation.Emulated
})
export class BlogPostComponent {
  private sub: Subscription

  constructor(
    seoService: SEOService, 
    public postService: PostService,
    public globalService: GlobalService,
    private router: Router, 
    private route: ActivatedRoute, 
  ) {
    this.sub = postService.currentPost.subscribe(
      currentPost => seoService.doSEO(currentPost)
    )
    
    globalService.isReadingAPost = true
  }

  ngOnDestroy() {
    this.globalService.isReadingAPost = false
    this.sub.unsubscribe()
  }
}
