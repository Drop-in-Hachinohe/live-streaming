import { Client as NClient } from '@notionhq/client'
import {
  PageObjectResponse,
  PartialPageObjectResponse,
  PartialDatabaseObjectResponse,
  DatabaseObjectResponse
} from '@notionhq/client/build/src/api-endpoints'
import { Stream } from '~/models/stream'

export default defineEventHandler(
  async (
    _event
  ): Promise<
    (PageObjectResponse |
    PartialPageObjectResponse |
    PartialDatabaseObjectResponse |
    DatabaseObjectResponse)[]
  > => {
    const runtimeConfig = useRuntimeConfig()

    const notion = new NClient({
      auth: runtimeConfig.notion.token as string || '',
    })

    const response = await notion.databases.query({
    database_id: runtimeConfig.notion.databaseId as string || '',
      // sorts: [
      //   {
      //     property: 'ID',
      //     direction: 'descending',
      //   },
      // ]
    })

    // 公開中のライブ情報を返却
    return response.results.filter(
      // @ts-ignore
      stream => stream.properties.publish.select.name === Stream.PUBLISH_TRUE
    )
  }
)