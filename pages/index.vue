<script setup lang="ts">
import { Stream } from '~/models/stream'
import type { StreamResponseResult } from '~/types/response'

const { $i18n } = useNuxtApp()

// ライブ配信データの購読とモデルクラスオブジェクトへの変換
const { data: streamsResponseResult } = await useFetch('/api/streams')
const streams = (streamsResponseResult.value as StreamResponseResult[]).map(nr => Stream.fromResponse(nr))

// Update Head
useHead({
  title: $i18n.t('app.name'),
})
</script>

<template>
  <main class="main">
    <!-- Key visual -->
    <section class="kv">
      <div class="logo">
        <h1 class="font-yu">奏者が勝手に楽しいアンサンブル</h1>
        <img src="~/assets/images/kv_logo.png" class="logoImg" alt="黒かもめアンサンブル" />
      </div>
    </section>
    <!-- ライブ配信情報一覧 -->
    <section class="section streams_info bg_cloth">
      <h2 class="subheading font-yu">ライブ配信情報</h2>
      <div :class="streams.length > 0 ? 'info_container' : ''">
        <template v-if="streams.length > 0">
          <StreamInfo
            v-for="stream in streams"
            :key="stream.link" 
            :stream="stream"
            class="mb-16"
          />
        </template>
        <p v-else class="text-center mt-5">配信情報はありません。</p>
      </div>

      <!-- 過去のコンサート動画 -->
      <div class="flex items-center justify-center pt-6 pb-3">
        <a href="https://www.youtube.com/@user-yk8qe2nv2h" target="_blank">
          <div class="flex items-center gap-3 bg-white px-4 py-2 rounded hover:shadow">
            <p class="text-sm">過去のコンサート動画</p>
            <img src="~/assets/images/youtube.jpg" class="w-20" />
          </div>
        </a>
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss">
.main {
  @apply mt-[50px];
  @media (min-width: 640px) {
    @apply mt-[100px];
  }
}

.kv {
  @apply flex justify-center items-center relative w-full h-[400px] px-[10px];
  @media (max-width: 640px) {
    @apply h-[350px];
  }
}

.logo {
  @apply w-[500px] z-10;
  @media (max-width: 700px) {
    @apply h-[60vw];
  }

  > h1 {
    @apply text-xl text-center text-slate-500 pb-6;
  }

  &Img {
    @apply w-full;
  }
}

.streams_info {
  @apply px-0 #{!important};

  .subheading {
    @apply text-2xl text-center;
  }

  .info_container {
    @apply py-12;
  }
}

.bg_cloth {
  @apply bg-repeat;
  background-image: url("assets/images/bg_cloth.png");
}
</style>
