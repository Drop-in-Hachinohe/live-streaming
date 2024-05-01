export type TagResponse = {
  color: string
  id: string
  name: string
}

export type StreamResponseResult = {
  archived: boolean
  cover: string | null
  created_by: {
    id: string
    object: string
  }
  created_time: string
  icon: string | null
  id: string
  in_trash: boolean
  last_edited_by: {
    id: string
    object: string
  }
  last_edited_time: string
  object: string
  parent: {
    database_id: string
    type: string
  }
  public_url: string | null
  url: string
  properties: {
    ID: {
      id: string
      type: 'unique_id'
      unique_id: {
        number: number
        prefix: string
      }
    },
    created_at: {
      created_time: string
      id: string
      type: 'created_time'
    }
    publish: {
      id: string
      select: {
        color: string
        id: string
        name: '公開' | '非公開'
      }
      type: 'multi_select'
    }
    status: {
      id: string
      status: {
        color: string
        id: string
        name: 'Not started' | 'In progress' | 'Done'
      }
      type: 'status'
    }
    tags: {
      id: string
      multi_select: TagResponse[]
      type: 'multi_select'
    }
    link: {
      id: string
      type: 'url'
      url: string | null
    }
    live_at: {
      id: string
      type: 'date'
      date: {
        start: string | null
        end: string | null
        time_zone: string | null
      }
    }
    thumbnail: {
      id: string
      type: 'url'
      url: string | null
    }
    title: {
      id: string
      title: {
        annotations: {
          bold: boolean
          code: boolean
          color: string
          italic: boolean
          strikethrough: boolean
          underline: boolean
        }
        href: string | null
        plain_text: string
        text: {
          content: string
          link: string | null
        }
        type: 'text'
      }[]
      type: 'title'
    }
  }
}

export type YouTubeVideoItemResponse = {
  id: string;
  snippet: {
     title: string;
     description: string;
     thumbnails: {
        [key: string]: {
           url: string;
           width: number;
           height: number;
        };
     };
  };
  contentDetails: {
     duration: string;
  };
  statistics: {
     viewCount: string;
     likeCount: string;
  };
}

export type YouTubeVideosResponse = {
  items: YouTubeVideoItemResponse[]
}
