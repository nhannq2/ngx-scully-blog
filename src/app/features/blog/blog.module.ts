import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import {
  FaIconLibrary,
  FontAwesomeModule,
} from "@fortawesome/angular-fontawesome";
import {
  faBloggerB,
  faFacebookF,
  faGithub,
  faLinkedinIn,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faHome, faSearch } from "@fortawesome/free-solid-svg-icons";
import { NgbCollapseModule } from "@ng-bootstrap/ng-bootstrap";
import { ScullyLibModule } from "@scullyio/ng-lib";
import { AdsenseModule } from "ng2-adsense";
import { BlogHomeComponent } from "./blog-home/blog-home.component";
import { BlogPostItemComponent } from "./blog-home/blog-post-item/blog-post-item.component";
import { BlogPageDetailComponent } from "./blog-page-detail/blog-page-detail.component";
import { BlogPostComponent } from "./blog-post/blog-post.component";
import { BlogComponent } from "./blog.component";
import { BlogFiltersInfoComponent } from "./components/blog-filters-info/blog-filters-info.component";
import { BlogFooterComponent } from "./components/blog-footer/blog-footer.component";
import { BlogNavigationComponent } from "./components/blog-navigation/blog-navigation.component";
import { BlogRelatedPostsComponent } from "./components/blog-related-posts/blog-related-posts.component";
import { BlogSearchComponent } from "./components/blog-search/blog-search.component";

const routes: Routes = [
  {
    path: "",
    component: BlogComponent,
    children: [
      { path: "", component: BlogHomeComponent },
      { path: "**", component: BlogPostComponent },
    ],
  },
];

@NgModule({
  declarations: [
    BlogComponent,
    BlogHomeComponent,
    BlogNavigationComponent,
    BlogFooterComponent,
    BlogSearchComponent,
    BlogPostComponent,
    BlogPostItemComponent,
    BlogFiltersInfoComponent,
    BlogRelatedPostsComponent,
    BlogPageDetailComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbCollapseModule,
    FormsModule,
    FontAwesomeModule,
    ScullyLibModule,
    AdsenseModule,
  ],
})
export class BlogModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faHome,
      faSearch,
      faBloggerB,
      faFacebookF,
      faGithub,
      faLinkedinIn,
      faTwitter
    );
  }
}
