import { ICategory } from '../../src/app/models'

/**
 * This array define all categories in your blog. You can manage your categories by update this array. 
 * Each category includes: 
 * - A category key to distinguish a category with others. This key is also used in the header of your blog files (markdown files in `ngx-scully-blog/blog` folder).
 * - A display name, which will be displayed on your blog.
 * 
 * For example, `{key: 'angular', displayName: 'Angular programming'}`
 * 
 * Update this array to your categories.
 */
export const CATEGORIES: ICategory[] = [
    {key: '', displayName: 'All'},
    {key: 'golang', displayName: '#Golang'},
    {key: 'angular', displayName: '#Angular'},
    {key: 'nestjs', displayName: '#Nestjs'},
    {key: 'self-learning', displayName: 'Tự học lập trình'},
    {key: 'uncategorized', displayName: 'Uncategorized'},
]