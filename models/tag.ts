import type { TagResponse } from '~/types/response'

interface TagArgs {
  id: string
  name: string
}

export class Tag {
  constructor(args: TagArgs) {
    this.id = args.id
    this.name = args.name
  }

  id: string
  name: string

  static dummy(): Tag {
    return new Tag({
      id: '',
      name: '',
    })
  }

  static fromResponse(response?: TagResponse): Tag {
    return new Tag({
      id: response?.id || '',
      name: response?.name || '',
    })
  }
}
