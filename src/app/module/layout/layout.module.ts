import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  FaIconLibrary,
  FontAwesomeModule
} from '@fortawesome/angular-fontawesome';
import {
  faBloggerB,
  faFacebookF,
  faGithub,
  faLinkedinIn,
  faTwitter
} from '@fortawesome/free-brands-svg-icons';
import { faHome, faUser } from '@fortawesome/free-solid-svg-icons';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { NavigationComponent } from './navigation/navigation.component';

@NgModule({
  declarations: [NavigationComponent],
  exports: [NavigationComponent],
  imports: [CommonModule, NgbCollapseModule, FontAwesomeModule, RouterModule],
})
export class LayoutModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faHome,
      faUser,
      faBloggerB,
      faFacebookF,
      faGithub,
      faLinkedinIn,
      faTwitter
    );
  }
}
