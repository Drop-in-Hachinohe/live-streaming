<script setup lang="ts">
import { Live } from '~/models/live'
import type { LiveResponseResult } from '~/types/response'

const { $i18n } = useNuxtApp()

const { data: livesResponseResults } = await useFetch('/api/lives')
const lives = (livesResponseResults.value as LiveResponseResult[]).map(nr => Live.fromResponse(nr))

// console.log(livesResponseResults.value)
// console.log(lives)

useHead({
  title: $i18n.t('app.name'),
})
</script>

<template>
  <main>
    <h1>Drop in ライブ配信</h1>
    <div v-for="live in lives" :key="live.link">
      <h2>{{ live.title }}</h2>
      <a :href="live.link">アクセスはこちらから</a>
    </div>
  </main>
</template>
