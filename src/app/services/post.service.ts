import { Injectable } from '@angular/core';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { StringHelper } from '@helpers'; 
import { Post } from '@models'; 

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private searchTerm = new BehaviorSubject<string>('')
  private filters$ = combineLatest([this.searchTerm])
  private _posts: Post[] = []
  private _relatedPosts: Post[] = []

  get currentPost(): Observable<Post> {
    return this.scullyRoutes.getCurrent().pipe(
      map(post => {
        return post as Post
      })
    )
  }
  get relatedPosts(): Post[] {
    return this._relatedPosts
  }
  get posts(): Post[] {
    return this._posts
  }
  readonly searchTerm$ = this.searchTerm.asObservable()

  constructor(private scullyRoutes: ScullyRoutesService) { 
    this.scullyRoutes.getCurrent().subscribe(post => {
      this.setRelatedPostsToCurrentPost(post as Post)
    })
    this.fetchPosts()
  }

  search(searchTerm: string) {
    this.searchTerm.next(searchTerm)
  }

  private fetchPosts() {
    this.filters$.pipe(
      switchMap(([searchTerm]) => {
        return this.scullyRoutes.available$.pipe(
          map((routes: Post[]) => this.filterPosts(routes, searchTerm))
        )
      })
    )
    .subscribe(posts => {
      this._posts = posts
    })
  }

  private setRelatedPostsToCurrentPost(currentPost: Post) {
    if (!currentPost || !currentPost.categories) {
      return
    }
    
    let cats = currentPost.categories
      .split(',')
      .map(c => c.trim().toLowerCase()) || []

    this._relatedPosts = this.posts.filter(p => {
      for (let i = 0; i < cats.length; i++) {
        if (p?.categories.toLowerCase().includes(cats[i])) {
          return true
        }
      }
      return false
    })
  }

  private filterPosts(posts: Post[], searchTerm?: string): Post[] {
    let results = posts
      .filter(
        route => 
          !route.route.includes('/page/') &&
          route.published && 
          route.title && 
          route.description
      )

    if (searchTerm) {
      results = results.filter(post => {
        let _title = StringHelper.asciiSlug(post.title)
        let _description = StringHelper.asciiSlug(post.description)
        let _searchTerm = StringHelper.asciiSlug(searchTerm)

        return _title.includes(_searchTerm) || _description.includes(_searchTerm)
      })
    }

    return results.sort((rA, rB) => {
      return new Date(rB.date).getTime() - new Date(rA.date).getTime()
    })
  }
}
