<script setup lang="ts">
import { Stream } from '~/models/stream'

const props = defineProps({
  stream: {
    type: Stream,
    default: () => {},
  },
})

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
  const dateOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
  const timeOptions: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: false };

  // 日本語で日付と時刻をフォーマット
  const formattedDate = d.toLocaleDateString('ja-JP', dateOptions);
  const formattedTime = d.toLocaleTimeString('ja-JP', timeOptions);

  return `${formattedDate} ${formattedTime} ~`;
}

const liveStartAt = computed<string>((): string => {
  if (!props.stream.liveStartAt) return ''

  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
  const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: false };

  return formatDate(new Date(props.stream.liveStartAt))
})

const status = computed<string>((): string => {
  switch (props.stream.status) {
    case Stream.STATUS_NOT_STARTED:
      return '配信予定'
    case Stream.STATUS_IN_PROGRESS:
      return '配信中'
    case Stream.STATUS_DONE:
      return '配信終了'
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
    <h3>{{ stream.title }}</h3>
    <img :src="thumbnailUrl" :alt="stream.title">
    <p class="status"><span class="font-bold" :style="{ 'color': textColorByStatus }">{{ status }}</span> / {{ liveStartAt }}</p>
    <a
      class="btn w-fit bg-kurokamome-yellow text-white px-6 py-3 text-sm"
      :href="stream.link"
      target="_blank"
      rel="noopener"
      >コンサートをみる</a
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
    @apply mt-4 mb-6;
  }

  > h3 {
    @apply text-xl text-center mb-4 font-bold;
  }
}
</style>