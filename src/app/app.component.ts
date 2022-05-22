import { Component } from '@angular/core';
import { BLOG_COPYRIGHT_CONTENT, EMAIL, FIRST_NAME, LAST_NAME, MENUS, PROFILE_IMAGE, SHORT_INTRODUCTION, SOCIAL_LINKS } from '@config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  MENUS = MENUS
  fullName = FIRST_NAME + ' ' + LAST_NAME
  PROFILE = PROFILE_IMAGE
  INTRO = SHORT_INTRODUCTION
  SOCIALS = SOCIAL_LINKS
  EMAIL = EMAIL
  BLOG_COPYRIGHT_CONTENT = BLOG_COPYRIGHT_CONTENT
}
