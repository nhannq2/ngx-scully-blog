import { Component } from '@angular/core';
import { BLOG_COPYRIGHT_CONTENT } from '@configuration';

@Component({
  selector: 'app-blog-footer',
  templateUrl: './blog-footer.component.html',
  styleUrls: ['./blog-footer.component.scss']
})
export class BlogFooterComponent {
  copyrightText = BLOG_COPYRIGHT_CONTENT
}
