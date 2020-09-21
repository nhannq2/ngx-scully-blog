import { IMenu } from '../../src/app/models/i-menu';

/**
 * Menu items on the top navigation bar. 
 * Each menu contains 
 * - a name to display on the blog
 * - the route it navigates to 
 * 
 * You can add more menu items. 
 * For example, to add a donation page, just add an item to this array as below:
 * `{name: 'Donation', route: '/blog/page/donation'}`
 * then add `donation.md` file to `ngx-scully-blog/blog/page` folder, 
 * the content of this file is the content of the new page.
 */
export const MENUS: IMenu[] = [
    /**
     * Navigate to blog home page
     */
    {name: 'Home', route: '/blog', icon: ['fas', 'home']},
    /**
     * Navigate to about page
     * 
     * Content of this page is the content of `about.md` file in 
     * `ngx-scully-blog/blog/page` folder.
     */
    {name: 'About', route: '/blog/page/about'},
]