<script setup lang="ts">
const openMenu = ref<boolean>(false)

const message = computed(() => {
  return openMenu.value ? "閉じる" : "メニュー"
})

const props = defineProps({
  menuList: {
    type: Array,
    required: true,
  },
  bgColorClass: {
    type: String,
    required: true,
  },
  textColorClass: {
    type: String,
    default: "text-white"
  },
  headerLogoLink: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <nav class="header" :class="bgColorClass">
    <a href="https://www.dropin8.jp/kurokamome" class="header_logo">
      <img src="~/assets/images/header_logo.jpg" />
    </a>
    <HeaderMenu 
      :menuList="menuList" 
      :headerClass="'header_nav'"
    />

    <div class="toggle_btn" @click="openMenu = !openMenu">
      {{ message }}
    </div>
    <transition name="slide">
      <HeaderMenu
        v-show="openMenu"
        :menuList="menuList"
        :bgColorClass="bgColorClass"
        :textColorClass="textColorClass"
        :headerClass="'header_nav_sp'"
        @close="openMenu = false"
      />
    </transition>
  </nav>
</template>

<style lang="scss" scoped>
.header {
  @apply flex justify-between items-center fixed top-0 w-full h-[50px] z-50 shadow-2xl;
  @media (min-width: 640px) {
    height: 100px;
  }
  &_logo {
    @apply w-[100px] flex flex-col justify-center px-6;
    @media (min-width: 640px) {
      @apply w-[150px];
    }
  }
}
:deep(.header_nav) {
  @apply hidden;
  @media (min-width: 640px) {
    @apply flex justify-end;
  }
  .icon {
    @apply h-[60px] no-underline;
  }
  .item {
    @apply w-[120px] py-0 px-[5px] flex flex-col items-center justify-center no-underline;
  }
}
.toggle_btn {
  @apply grid place-items-center py-0 px-[10px] bg-white h-9 text-sm mr-3;
  @media (min-width: 640px) {
    @apply hidden;
  }
  border-radius: 5px;
}
:deep(.header_nav_sp) {
  @media (min-width: 640px) {
    @apply hidden;
  }
  @apply absolute top-[50px] w-full flex flex-wrap;

  .item {
    @apply w-1/2 flex items-center pl-3 no-underline;
    border-top: dotted 1px white;
    &:nth-child(2n) {
      border-left: dotted 1px white;
    }
  }
  .icon {
    @apply h-[60px] p-[5px];
  }
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-50px);
}
</style>
