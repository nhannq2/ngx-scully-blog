import { Menu } from '@model';

/**
 * Each menu contains:
 * - A display name
 * - A route it navigates to 
 * - An optional icon
 */
export const MENUS: Menu[] = [
    // Navigate to blog home page
    {name: 'Blogs', route: '/'},
    {name: 'About Me', route: '/blog/about-me'},
]