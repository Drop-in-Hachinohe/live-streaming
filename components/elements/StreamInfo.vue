<script setup lang="ts">
import { Stream } from '~/models/stream'

const props = defineProps({
  stream: {
    type: Stream,
    default: () => {},
  },
})

const { $i18n } = useNuxtApp()

const thumbnailUrl = computed<string>((): string => {
  if (props.stream.thumbnail) return props.stream.thumbnail

  if (props.stream.link.includes("youtube.com")) {
    const urlParams = new URLSearchParams(new URL(props.stream.link).search)
    const videoId = urlParams.get('v')
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  } else {
    return ''
  }
})

const formatDate = (d: Date) => {
  const dateOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' }
  const timeOptions: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: false }

  // 日本語で日付と時刻をフォーマット
  const formattedDate = d.toLocaleDateString('ja-JP', dateOptions)
  const formattedTime = d.toLocaleTimeString('ja-JP', timeOptions)

  return `${formattedDate} ${formattedTime} ~`;
}

const liveStartAt = computed<string>((): string => {
  if (!props.stream.liveStartAt) return ''
  return formatDate(new Date(props.stream.liveStartAt))
})

const status = computed<string>((): string => {
  switch (props.stream.status) {
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

const textColorByStatus = computed<string>((): string => {
  switch (props.stream.status) {
    case Stream.STATUS_NOT_STARTED:
      return '#e45d5d'
    case Stream.STATUS_IN_PROGRESS:
      return '#2e81e3'
    case Stream.STATUS_DONE:
      return '#307d7d'
    default:
      return '#e45d5d'
  }
})
</script>

<template>
  <div class="stream_info">
    <h3 :id="stream.uuid">{{ stream.title }}</h3>
    <img :src="thumbnailUrl" :alt="stream.title">
    <p class="status"><span class="font-bold" :style="{ 'color': textColorByStatus }">{{ status }}</span> / {{ liveStartAt }}</p>
    <a
      class="btn btn_link"
      :href="stream.link"
      target="_blank"
      rel="noopener"
      >{{ $t('streaminfo.watch') }}</a
    >
  </div>
</template>

<style lang="scss" scoped>
.stream_info {
  @apply w-full max-w-xl mx-auto text-center md:px-0 px-8;
  
  &:last-of-type {
    @apply mb-0 #{!important};
  }

  .status {
    @apply mt-4 mb-6 relative z-[49];
  }

  .btn_link {
    @apply w-fit bg-kurokamome-yellow text-white px-6 py-3 text-sm relative z-[49];
  }

  > h3 {
    @apply text-xl text-center mb-4 font-bold relative z-0;

    @apply pt-[72px] mt-[-72px];
    @media (min-width: 640px) {
      @apply pt-[128px] mt-[-128px];
    }
  }
}
</style>