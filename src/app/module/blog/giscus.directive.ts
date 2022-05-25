import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Directive, ElementRef, Inject, Input } from '@angular/core';
import { GISCUS_DATA_CATEGORY, GISCUS_DATA_CATEGORY_ID, GISCUS_DATA_REPO, GISCUS_DATA_REPO_ID } from '@config';

@Directive({
  selector: '[appGiscus]',
})
export class GiscusDirective implements AfterViewInit {
  @Input() appGiscus = false;

  constructor(@Inject(DOCUMENT) private document: Document, private el: ElementRef<HTMLElement>) {}

  ngAfterViewInit() {
    if (this.appGiscus) {
      try {
        const scriptEl = this.document.createElement('script');
        scriptEl.async = true;
        scriptEl.src = 'https://giscus.app/client.js';
        scriptEl.setAttribute('data-repo', GISCUS_DATA_REPO);
        scriptEl.setAttribute('data-repo-id', GISCUS_DATA_REPO_ID);
        scriptEl.setAttribute('data-category', GISCUS_DATA_CATEGORY);
        scriptEl.setAttribute('data-category-id', GISCUS_DATA_CATEGORY_ID);
        scriptEl.setAttribute('data-mapping', 'pathname');
        scriptEl.setAttribute('data-reactions-enabled', '1');
        scriptEl.setAttribute('data-emit-metadata', '0');
        scriptEl.setAttribute('data-theme', 'light');
        scriptEl.setAttribute('data-lang', 'en');
        scriptEl.setAttribute('crossorigin', 'anonymous');
        this.el.nativeElement.appendChild(scriptEl);
      } catch (e) {
        console.log('Error adding Giscus comments', e);
      }
    } else {
      this.el.nativeElement.innerHTML = '<h6>Giscus comment is not available in DEV mode</h6>';
    }
  }
}
