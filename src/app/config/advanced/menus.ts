import { Menu } from '@model';

/**
 * Each menu contains:
 * - A display name
 * - A route it navigates to 
 * - An optional icon
 */
export const MENUS: Menu[] = [
    {name: 'Home', route: '/', icon: ['fas', 'home']},
    // {name: 'About Me', route: '/blog/about-me', icon: ['fas', 'user']},
]