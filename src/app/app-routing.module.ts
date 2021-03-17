import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { 
    path: 'portfolio', 
    loadChildren: () => import('./features/portfolio/portfolio.module').then(m => m.PortfolioModule),
    pathMatch: 'full'
  },
  { 
    path: '', 
    loadChildren: () => import('./features/blog/blog.module').then(m => m.BlogModule) 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
