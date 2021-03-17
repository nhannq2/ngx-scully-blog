import { Injectable } from '@angular/core';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { StringHelper } from '../helpers';
import { ICategory, IPost } from '../models'; 

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private searchTerm = new BehaviorSubject<string>('')
  private category = new BehaviorSubject<ICategory|null>(null)
  private filters$ = combineLatest([this.searchTerm, this.category])
  private _posts: IPost[] = []
  private _relatedPosts: IPost[] = []

  get currentPost(): Observable<IPost> {
    return this.scullyRoutes.getCurrent().pipe(
      map(post => {
        return post as IPost
      })
    )
  }
  get relatedPosts(): IPost[] {
    return this._relatedPosts
  }
  get posts(): IPost[] {
    return this._posts
  }
  readonly category$ = this.category.asObservable()
  readonly searchTerm$ = this.searchTerm.asObservable()

  constructor(private scullyRoutes: ScullyRoutesService) { 
    this.scullyRoutes.getCurrent().subscribe(post => {
      this.setRelatedPostsToCurrentPost(post as IPost)
    })
    this.fetchPosts()
  }

  filterByCategory(category: ICategory) {
    this.category.next(category)
  }

  search(searchTerm: string) {
    this.searchTerm.next(searchTerm)
  }

  private fetchPosts() {
    this.filters$.pipe(
      switchMap(([searchTerm, category]) => {
        return this.scullyRoutes.available$.pipe(
          map((routes: IPost[]) => this.filterPosts(routes, category?.key || '', searchTerm))
        )
      })
    )
    .subscribe(posts => {
      this._posts = posts
    })
  }

  private setRelatedPostsToCurrentPost(currentPost: IPost) {
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

  private filterPosts(posts: IPost[], categorykey?: string, searchTerm?: string): IPost[] {
    let results = posts
      .filter(
        route => 
          !route.route.includes('/page/') &&
          route.published && 
          route.title && 
          route.description
      )

    if (categorykey) {
      results = results.filter(post => {
        if (!post.categories) {
          return false
        }
        return post.categories.toLowerCase().includes(categorykey.toLowerCase())
      })
    }

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
