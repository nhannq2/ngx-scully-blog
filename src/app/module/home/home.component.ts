import { Component, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AD_SLOT } from '@config';
import { latestByDate, StringHelper } from '@helper';
import { Route } from '@model';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { SeoHelperService } from '@service';
import { BehaviorSubject, combineLatest, map, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  AD_SLOT = AD_SLOT;
  searchTerm: string = '';
  tag: string = '';

  private sub? :Subscription
  private searchTermSubject = new BehaviorSubject<string>('');
  private tagSubject = new BehaviorSubject<string>('');

  readonly routes$: Observable<Route[]> = combineLatest([
    this.scullyRoutes.available$,
    this.searchTermSubject,
    this.tagSubject,
  ]).pipe(
    map(([routes, searchTerm, tag]) => {
      let blogRoutes = ((routes as Route[]) || []).filter(
        (r) => r.route.includes('/blog') && r.title && r.status == 'Published'
      );
      if (searchTerm) {
        blogRoutes = blogRoutes.filter(
          (r) =>
            this.searchMatched(searchTerm, r.title || '') ||
            this.searchMatched(searchTerm, r.description)
        );
      }
      if (tag) {
        blogRoutes = blogRoutes.filter((r) => r.tags.includes(tag));
      }

      return blogRoutes;
    }),
    latestByDate<Route[]>()
  );

  constructor(
    seoHelper: SeoHelperService,
    public scullyRoutes: ScullyRoutesService,
    public route: ActivatedRoute,
    private router: Router
  ) {
    seoHelper.setData();

    const tag = route.snapshot.queryParamMap.get("t") || ''
    this.filterByTag(tag)

    const searchTerm = route.snapshot.queryParamMap.get("s") || ''
    this.search(searchTerm)
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.sub?.unsubscribe()
  }

  search(searchTerm: string) {
    this.searchTerm = searchTerm
    this.searchTermSubject.next(searchTerm);

    let query = {
      ...this.route.snapshot.queryParams,
      s: searchTerm || null,
    };
    this.router.navigate(['/'], { queryParams: query });
  }
  
  filterByTag(tag: string) {
    this.tag = tag
    this.tagSubject.next(tag);

    let query = {
      ...this.route.snapshot.queryParams,
      t: tag || null,
    };
    this.router.navigate(['/'], { queryParams: query });
  }

  private searchMatched(searchTerm: string, content: string): boolean {
    return StringHelper.asciiSlug(content).includes(
      StringHelper.asciiSlug(searchTerm)
    );
  }
}
