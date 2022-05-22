import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AD_SLOT } from '@config';
import { latestByDate, StringHelper } from '@helper';
import { Route } from '@model';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { SeoHelperService } from '@service';
import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  switchMap,
} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  AD_SLOT = AD_SLOT;
  searchTerm: string = '';

  private searchTermSubject = new BehaviorSubject<string>('');
  
  readonly routes$: Observable<Route[]> = combineLatest([
    this.scullyRoutes.available$,
    this.searchTermSubject,
  ]).pipe(
    map(([routes, searchTerm]) => {
      return ((routes as Route[]) || [])
        .filter(
          (r) => r.route.includes('/blog') && r.title && r.status == 'Published'
        )
        .filter(
          (r) =>
            this.searchMatched(searchTerm, r.title || '') ||
            this.searchMatched(searchTerm, r.description)
        );
    }),
    latestByDate<Route[]>()
  );

  constructor(
    seo: SeoHelperService,
    public scullyRoutes: ScullyRoutesService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    seo.setData();

    this.searchTerm = route.snapshot.queryParamMap.get('s') || ''
    this.searchTermSubject.next(this.searchTerm);
  }

  ngOnInit(): void {}

  search(searchTerm: string) {
    this.searchTermSubject.next(searchTerm);

    let query = {
      ...this.route.snapshot.queryParams,
      s: searchTerm || null
    }
    this.router.navigate([], {queryParams: query})
  }

  private searchMatched(searchTerm: string, content: string): boolean {
    return StringHelper.asciiSlug(content).includes(
      StringHelper.asciiSlug(searchTerm)
    );
  }
}
