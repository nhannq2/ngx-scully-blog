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
      { path: 'page/:slug', component: BlogPageDetailComponent },
      { path: 'blog/:slug', redirectTo: ':slug' },
      { path: ':slug', component: BlogPostComponent },
      { path: '**', component: BlogPostComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
