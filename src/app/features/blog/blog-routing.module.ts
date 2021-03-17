import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogHomeComponent } from './blog-home/blog-home.component';
import { BlogPageDetailComponent } from './blog-page-detail/blog-page-detail.component';
import { BlogPostComponent } from './blog-post/blog-post.component';
import { BlogComponent } from './blog.component';


const routes: Routes = [
  { 
    path: '', 
    component: BlogComponent,
    children: [
      { path: '', component: BlogHomeComponent },
      { path: ':slug', component: BlogPostComponent },
      { path: 'page/:slug', component: BlogPageDetailComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
