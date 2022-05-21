import { Menu } from '@models';

/**
 * Each menu contains:
 * - A display name
 * - A route it navigates to 
 * - An optional icon
 */
export const MENUS: Menu[] = [
    // Navigate to blog home page
    {name: 'Blogs', route: '/blog', icon: ['fas', 'home']},
]