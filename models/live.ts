import type { LiveResponseResult } from '~/types/response'
import { Tag } from './tag'

interface LiveArgs {
  // number: number
  title: string
  tags: Tag[]
  link: string
  thumbnail: string
  publish: boolean
}

export class Live {
  constructor(args: LiveArgs) {
    // this.number = args.number
    this.title = args.title
    this.tags = args.tags
    this.link = args.link
    this.thumbnail = args.thumbnail
    this.publish = args.publish
  }

  // number: number
  title: string
  tags: Tag[]
  link: string
  thumbnail: string
  publish: boolean

  static dummy(): Live {
    return new Live({
      // number: 0,
      title: '',
      tags: [],
      link: '',
      thumbnail: '',
      publish: false,
    })
  }

  static fromResponse(response?: LiveResponseResult): Live {
    return new Live({
      // number: response?.properties.ID.unique_id.number || 0,
      title: response?.properties.title.title[0].text.content || '',
      tags: response?.properties.tags.multi_select.map(tag => Tag.fromResponse(tag)) ?? [] as Tag[],
      link: response?.properties.link.url || '',
      thumbnail: response?.properties.thumbnail.url || '',
      publish: response?.properties.publish.select.name === '公開',
    })
  }
}
