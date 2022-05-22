import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { BlogItemComponent } from './blog-item/blog-item.component';
import { AdsenseModule } from 'ng2-adsense';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


@NgModule({
  declarations: [
    HomeComponent,
    BlogItemComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    AdsenseModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ]
})
export class HomeModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faSearch);
  }
}
