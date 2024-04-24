<script setup lang="ts">
defineProps({
  menuList: {
    type: Object,
    required: true
  },
  snsList: {
    type: Array,
    required: true
  },
  bgColorClass: {
    type: String,
    required: true
  },
  textColorClass: {
    type: String,
    default: "text-white"
  },
  headerLogoImg: {
    type: String,
    required: true
  },
  headerLogoLink: {
    type: String,
    required: true
  },
})
</script>
<template>
  <div :class="[textColorClass, bgColorClass]">
    <section class="section">
      <section class="sm:flex sm:justfy-between sm:items-center">
        <nuxt-link :to="headerLogoLink">
          <img src="~/assets/images/header_logo.jpg" class="w-28"/>
        </nuxt-link>
        <ul class="flex sm:ml-6">
          <li v-for="sns in snsList" class="flex frex-col items-center">
            <a :href="sns.link" target="_blank">
              <img :src="sns.imageSrc.default" class="w-12 px-1"/>
            </a>
          </li>
          <li>
            <slot />
          </li>
        </ul>
      </section>
      <section>
        <ul class="md:flex mt-20">
          <li v-for="(menu, index) in menuList" :key="index" 
            class="md:flex-1 p-2">
            <p class="font-bold text-base menu_title">
              {{ menu.title }}
            </p>
            <ul class="mt-3">
              <a :href="item.link" v-for="item in menu.itemList" :target="item.target ? '_blank' : '_self'">
                <li class="pb-1 text-sm">
                  <p>{{ item.name }}</p>
                </li>
              </a>
            </ul>
          </li>
        </ul>
      </section>
      <div class="flex justify-center mt-6">
        <a href="/">
          <img src="~/assets/images/base_logo.png" class="w-32 py-3"/>
          <p class="text-xs text-center">Drop in 総合TOP</p>
        </a>
      </div>
      
      <p class="mt-8 text-xs text-center">© Drop in. All RIGHTS RESERVED.</p>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.menu_title {
  border-bottom: solid 1px white;
}
</style>
