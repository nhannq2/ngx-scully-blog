import { Component } from '@angular/core';
import { EMAIL, FIRST_NAME, LAST_NAME, MENUS, SHORT_INTRODUCTION, PROFILE_IMAGE, SOCIAL_LINKS } from '@configuration';

@Component({
  selector: 'app-blog-navigation',
  templateUrl: './blog-navigation.component.html',
  styleUrls: ['./blog-navigation.component.scss']
})
export class BlogNavigationComponent {
  menus = MENUS
  isMenuCollapsed = true
  fullName = FIRST_NAME + ' ' + LAST_NAME
  profileImage = PROFILE_IMAGE
  introduction = SHORT_INTRODUCTION
  socialLinks = SOCIAL_LINKS
  email = EMAIL
}
