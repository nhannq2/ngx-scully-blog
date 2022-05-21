import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CoreModule } from '@modules/core/core.module';

const routes: Routes = [
  { 
    path: 'blog', 
    loadChildren: () => import('./features/blog/blog.module').then(m => m.BlogModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'blog',
  }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    RouterModule.forRoot(
      routes, 
      { 
        scrollPositionRestoration: 'enabled', 
        relativeLinkResolution: 'legacy',
      },
    )
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
