import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { AdsenseModule } from 'ng2-adsense';
import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';
import { GiscusDirective } from './giscus.directive';

@NgModule({
  declarations: [BlogComponent, GiscusDirective],
  imports: [
    CommonModule,
    BlogRoutingModule,
    ScullyLibModule,
    FontAwesomeModule,
    AdsenseModule
  ],
})
export class BlogModule {}
