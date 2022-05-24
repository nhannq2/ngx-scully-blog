import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BLOG_COPYRIGHT_CONTENT, EMAIL, FIRST_NAME, LAST_NAME, MENUS, PROFILE_IMAGE, SHORT_INTRODUCTION, SOCIAL_LINKS } from '@config';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent {
  isMenuCollapsed = true
  menus = MENUS
  fullName = FIRST_NAME + ' ' + LAST_NAME
  profileImage = PROFILE_IMAGE
  introduction = SHORT_INTRODUCTION
  socialLinks = SOCIAL_LINKS
  email = EMAIL
  copyrightText = BLOG_COPYRIGHT_CONTENT
}
