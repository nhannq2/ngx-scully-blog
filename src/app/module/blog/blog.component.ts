import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AD_SLOT, BLOG_DEFAULT_COVER } from '@config';
import { environment } from '@env/environment';
import { Route } from '@model';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { SeoHelperService } from '@service';
import { map, Subscription } from 'rxjs';

declare var ng: any;

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  preserveWhitespaces: true,
  encapsulation: ViewEncapsulation.Emulated

})
export class BlogComponent implements OnInit {
  public currentRoute$ = this.scullyRoutes.getCurrent().pipe(map(r => r as Route))

  private sub?: Subscription
  AD_SLOT = AD_SLOT
  BLOG_DEFAULT_COVER = BLOG_DEFAULT_COVER
  isProd = environment.production;
  ngOnInit() {}

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    seo: SeoHelperService,
    private scullyRoutes: ScullyRoutesService
  ) {
    this.sub = this.currentRoute$.subscribe(
      (route) => {
        seo.setData({
          // title: post?.title,
          // keywords: post?.keywords,
          // description: post?.description,
          // image: post?.image,
          // type: 'article'
        })
      } 
    )
  }

  ngOnDestroy() {
    this.sub?.unsubscribe()
  }
}
