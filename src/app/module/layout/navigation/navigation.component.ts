import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Menu, SocialLink } from '@model';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent {
  isMenuCollapsed = true
  @Input()
  menus?: Menu[]
  @Input()
  fullName?: string
  @Input()
  profileImage?: string
  @Input()
  introduction?: string
  @Input()
  socialLinks?: SocialLink[]
  @Input()
  email?: string
  @Input()
  copyrightText?: string
}
