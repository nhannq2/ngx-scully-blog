import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JsonLdModule } from 'ngx-seo';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './modules/core/core.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    JsonLdModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
