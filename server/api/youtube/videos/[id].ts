import { YouTubeVideoItemResponse, YouTubeVideosResponse } from '~/types/response'

export default defineEventHandler(
  async (
    event
  ): Promise<YouTubeVideoItemResponse> => {
    const id = event.context.params?.id

    if (!id) {
      throw createError({ statusCode: 400, message: 'ビデオIDが必要です。' })
    }

    try {
      const apiKey = process.env.YOUTUBE_API_KEY
      const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${id}&key=${apiKey}`

      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('YouTube API リクエストに失敗しました。')
      }

      const data: YouTubeVideosResponse = await response.json()

      if (data.items.length === 0) {
        throw createError({ statusCode: 404, message: 'ビデオが見つかりません。' })
      }

      return data.items[0]
    } catch (error) {
      // @ts-ignore
      throw createError({ statusCode: 500, message: error.message })
    }
  }
)