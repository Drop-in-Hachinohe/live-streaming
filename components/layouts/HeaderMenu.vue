<script setup lang="ts">
defineProps({
  menuList: {
    type: Array,
    required: true
  },
  bgColorClass: {
    type: String,
    required: false
  },
  headerClass: {
    type: String,
    required: true
  },
})
</script>

<template>
  <nav :class="[bgColorClass, headerClass]">
    <a :href="item.target ? item.link : `https://www.dropin8.jp${item.link}`" v-for="item in menuList"
      :target="item.target ? '_blank' : '_self'"
      @click.native="$emit('close')"
      class="item"
    >
        <img :src="item.imageSrc.default" class="icon"/>
        <p class="nav_text">{{ item.name }}</p>
    </a>
  </nav>
</template>

<style lang="scss" scoped>
.nav_text {
  @apply text-sm text-center text-gray-800;
}
</style>