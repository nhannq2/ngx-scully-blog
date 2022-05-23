import { ScullyRoute } from '@scullyio/ng-lib';

export interface Route extends ScullyRoute {
    status: 'Published'|'WIP'|'Unlisted'|'Deleted'
    description: string
    tags: string[]
    publishedAt: string
    cover: string
}