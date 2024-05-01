<script setup lang="ts">
import { Stream } from '~/models/stream'
import type { StreamResponseResult } from '~/types/response'

definePageMeta({
  layout: 'share',
})

const { $i18n } = useNuxtApp()
const route = useRoute()
const router = useRouter()

const uuid = ref<string>(route.params.uuid as string)

// ライブ配信データの購読とモデルクラスオブジェクトへの変換
const { data: streamResponseResult } = await useFetch(`/api/streams/${route.params.uuid}`)
const stream = ref<Stream>(Stream.fromResponse(streamResponseResult.value as StreamResponseResult))

const videoId = ref<string>(((): string => {
  if (!stream.value.link.includes("youtube.com")) return ''
  const urlParams = new URLSearchParams(new URL(stream.value.link).search)
  return urlParams.get('v') ?? ''
})())

const { data: videoResponse } = await useFetch(`/api/youtube/videos/${videoId.value}`)

const status = computed<string>((): string => {
  switch (stream.value.status) {
    case Stream.STATUS_NOT_STARTED:
      return $i18n.t('streaminfo.scheduledstream')
    case Stream.STATUS_IN_PROGRESS:
      return $i18n.t('streaminfo.streamingnow')
    case Stream.STATUS_DONE:
      return $i18n.t('streaminfo.streamended')
    default:
      return ''
  }
})

const liveStartAt = computed<string>((): string => {
  if (!stream.value.liveStartAt) return ''
  return formatDate(new Date(stream.value.liveStartAt))
})

const description = computed<string>((): string => {
  const defaultDescription = `[${status}] ${stream.value.title} ${liveStartAt}`

  if (!videoResponse.value) return defaultDescription
  return videoResponse.value?.snippet.description.split('\n')[0] ?? defaultDescription
})

const thumbnailUrl = computed<string>((): string => {
  if (stream.value.thumbnail) return stream.value.thumbnail

  if (stream.value.link.includes("youtube.com")) {
    return `https://img.youtube.com/vi/${videoId.value}/maxresdefault.jpg`
  } else {
    return ''
  }
})

// Update Head
useHead({
  title: stream.value.title,
})

const { updateHead } = ogp()
updateHead({ i18nKey: 'page.name.stream.title', options: {
  title: stream.value.title
} }, description.value, thumbnailUrl.value)

// シェア時の OG 表示 & 適切なアンカーリンクを行うためのページのため, すぐにリダイレクト (replace)
onMounted(() => {
  router.replace(`/#${uuid.value}`)
})
</script>

<template>
  <div />
</template>

<style scoped lang="scss"></style>
