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

const thumbnailUrl = computed<string>((): string => {
  if (stream.value.thumbnail) return stream.value.thumbnail

  if (stream.value.link.includes("youtube.com")) {
    const urlParams = new URLSearchParams(new URL(stream.value.link).search)
    const videoId = urlParams.get('v')
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
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
} }, stream.value.title, thumbnailUrl.value)

// シェア時の OG 表示 & 適切なアンカーリンクを行うためのページのため, すぐにリダイレクト (replace)
onMounted(() => {
  router.replace(`/#${uuid.value}`)
})
</script>

<template>
  <div />
</template>

<style scoped lang="scss"></style>
