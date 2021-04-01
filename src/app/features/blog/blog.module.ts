import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faBloggerB, faFacebookF, faGithub, faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { BlogHomeComponent } from './blog-home/blog-home.component';
import { BlogPostItemComponent } from './blog-home/blog-post-item/blog-post-item.component';
import { BlogPostComponent } from './blog-post/blog-post.component';
import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';
import { BlogPageDetailComponent } from './blog-page-detail/blog-page-detail.component';
import { BlogNavigationComponent } from './components/blog-navigation/blog-navigation.component';
import { BlogSearchComponent } from './components/blog-search/blog-search.component';
import { BlogRelatedPostsComponent } from './components/blog-related-posts/blog-related-posts.component';
import { BlogFooterComponent } from './components/blog-footer/blog-footer.component';
import { BlogCategoriesComponent } from './components/blog-categories/blog-categories.component';
import { BlogFiltersInfoComponent } from './components/blog-filters-info/blog-filters-info.component';
import { AdsenseModule } from 'ng2-adsense';



@NgModule({
  declarations: [
    BlogComponent,
    BlogHomeComponent,
    BlogNavigationComponent,
    BlogFooterComponent,
    BlogSearchComponent,
    BlogCategoriesComponent,
    BlogPostComponent,
    BlogPostItemComponent,
    BlogFiltersInfoComponent,
    BlogRelatedPostsComponent,
    BlogPageDetailComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    NgbCollapseModule,
    FormsModule,
    FontAwesomeModule,
    ScullyLibModule,
    AdsenseModule
  ]
})
export class BlogModule { 
  constructor(library: FaIconLibrary) {
    library.addIcons(faHome, faSearch, faBloggerB, faFacebookF, faGithub, faLinkedinIn, faTwitter);
  }
}
