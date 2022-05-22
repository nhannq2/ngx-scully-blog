import { IconProp } from "@fortawesome/fontawesome-svg-core"

/**
 * A menu item in your blog.
 * Example: Home, About
 */
export interface Menu {
    name: string
    // Example: '/about', ['/', 'about']
    route: string|string[]
    /**
     * Example: ['fas', 'home']
     * See more at fontawsome module
     */
    icon?: IconProp
}