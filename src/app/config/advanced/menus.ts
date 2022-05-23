import { Menu } from '@model';

/**
 * Each menu contains:
 * - A display name
 * - A route it navigates to 
 * - An optional icon
 */
export const MENUS: Menu[] = [
    {name: 'Blogs', route: '/'},
    {name: 'About Me', route: '/blog/about-me'},
    {name: 'RSS Feed', route: '/feed.xml'},
]