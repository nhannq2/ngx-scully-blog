import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService, SeoHelperService } from '@services';
import { AD_SLOT } from '@configuration';

@Component({
  selector: 'app-blog-home',
  templateUrl: './blog-home.component.html',
  styleUrls: ['./blog-home.component.scss']
})
export class BlogHomeComponent {
  AD_SLOT = AD_SLOT
  constructor(
    public postService: PostService,
    route: ActivatedRoute,
    seo: SeoHelperService
  ) { 
    seo.setData()

    route.queryParamMap.subscribe(qM => {
      let searchTerm = qM.get('s')
      postService.search(searchTerm || '')
    })
  }
}
