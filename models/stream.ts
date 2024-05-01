import type { StreamResponseResult } from '~/types/response'
import { Tag } from './tag'

interface StreamArgs {
  uuid: string
  title: string
  tags: Tag[]
  status: string
  link: string
  liveStartAt: string | null
  thumbnail: string | null
  publish: boolean
}

export class Stream {
  static readonly STATUS_NOT_STARTED = 'Not started'
  static readonly STATUS_IN_PROGRESS = 'In progress'
  static readonly STATUS_DONE = 'Done'
  static readonly PUBLISH_TRUE = '公開'
  static readonly PUBLISH_FALSE = '非公開'

  constructor(args: StreamArgs) {
    this.uuid = args.uuid
    this.title = args.title
    this.tags = args.tags
    this.status = args.status
    this.link = args.link
    this.liveStartAt = args.liveStartAt
    this.thumbnail = args.thumbnail
    this.publish = args.publish
  }

  uuid: string
  title: string
  tags: Tag[]
  status: string
  link: string
  liveStartAt: string | null
  thumbnail: string | null
  publish: boolean

  static dummy(): Stream {
    return new Stream({
      uuid: '',
      title: '',
      tags: [],
      status: '',
      link: '',
      liveStartAt: '',
      thumbnail: '',
      publish: false,
    })
  }

  static fromResponse(response?: StreamResponseResult): Stream {
    return new Stream({
      uuid: response?.id || '',
      title: response?.properties.title.title[0].text.content || '',
      tags: response?.properties.tags.multi_select.map(tag => Tag.fromResponse(tag)) ?? [] as Tag[],
      status: response?.properties.status.status.name || Stream.STATUS_NOT_STARTED,
      link: response?.properties.link.url || '',
      liveStartAt: response?.properties.live_at.date?.start || null,
      thumbnail: response?.properties.thumbnail.url || null,
      publish: response?.properties.publish.select.name === Stream.PUBLISH_TRUE,
    })
  }
}
