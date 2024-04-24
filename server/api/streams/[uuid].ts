import { Client as NClient } from '@notionhq/client'
import { GetPageResponse } from '@notionhq/client/build/src/api-endpoints'
import { Stream } from '~/models/stream'

export default defineEventHandler(
  async (
    event
  ): Promise<GetPageResponse> => {
    const runtimeConfig = useRuntimeConfig()

    const notion = new NClient({
      auth: runtimeConfig.notion.token as string || '',
    })

    const response = await notion.pages.retrieve({ page_id: event.context.params?.uuid as string })

    // ライブ詳細情報を返却
    return response
  }
)