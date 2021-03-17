import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GlobalService, PostService, SeoHelperService } from 'src/app/services';

declare var ng: any;

@Component({
  selector: 'app-blog-page-detail',
  templateUrl: './blog-page-detail.component.html',
  styleUrls: ['./blog-page-detail.component.scss'],
  preserveWhitespaces: true,
  encapsulation: ViewEncapsulation.Emulated
})
export class BlogPageDetailComponent {
  private sub: Subscription

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    public globalService: GlobalService,
    postService: PostService,
    seo: SeoHelperService
  ) { 
    globalService.isReadingAPage = true
    this.sub = postService.currentPost.subscribe(
      post => seo.setData({
        title: post?.title,
        keywords: post?.keywords,
        description: post?.shortDescription,
        image: post?.image,
        type: 'article'
      })
    )
  }

  ngOnDestroy() {
    this.globalService.isReadingAPage = false
    this.sub.unsubscribe()
  }
}
