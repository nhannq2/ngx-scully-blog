import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SEARCH_SECTION_TITLE } from '../../../../../../configuration';

@Component({
  selector: 'app-blog-search',
  templateUrl: './blog-search.component.html',
  styleUrls: ['./blog-search.component.scss']
})
export class BlogSearchComponent {
  title = SEARCH_SECTION_TITLE
  lastSearch: string
  
  constructor(private router: Router, private route: ActivatedRoute) {
    route.queryParamMap.subscribe(qM => {
      this.lastSearch = qM.get('s')
    })
  }

  doSearch(searchTerm: string) {
    let query = {
      ...this.route.snapshot.queryParams,
      s: searchTerm || null
    }
    this.router.navigate(['/'], {queryParams: query})
  }
}
