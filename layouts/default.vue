<script setup lang="ts">
const { $i18n } = useNuxtApp()

const headerMenuList = ref([
  {
    name: $i18n.t('menu.owner'),
    link: "/kurokamome/owner",
    imageSrc: await import(`~/assets/images/header/icon_owner.png`),
  },
  {
    name: $i18n.t('menu.archives'),
    link: "https://www.youtube.com/@%E9%BB%92%E3%81%8B%E3%82%82%E3%82%81%E3%82%A2%E3%83%B3%E3%82%B5%E3%83%B3%E3%83%96%E3%83%AB",
    imageSrc: await import(`~/assets/images/header/icon_video.png`),
    target: true
  },
  {
    name: $i18n.t('menu.news'),
    link: "/kurokamome/news",
    imageSrc: await import(`~/assets/images/header/icon_news.png`),
  },
  {
    name: $i18n.t('menu.contact'),
    link: "/kurokamome/contact",
    imageSrc: await import(`~/assets/images/header/icon_contact.png`),
  },
]);

const footerMenuList = ref([
  {
    title: $i18n.t('menu.aboutkurokamome'),
    itemList: [
      {
        name: $i18n.t('menu.archives'),
        link: "https://www.youtube.com/@user-yk8qe2nv2h",
        target: true
      },
      {
        name: $i18n.t('menu.news'),
        link: "https://www.dropin8.jp/kurokamome/news",
      },
      {
        name: $i18n.t('menu.contact'),
        link: "https://www.dropin8.jp/kurokamome/contact",
      },
      {
        name: $i18n.t('menu.owner'),
        link: "https://www.dropin8.jp/kurokamome/owner",
      },
    ]
  },
  {
    title: $i18n.t('menu.other'),
    itemList: [
      {
        name: $i18n.t('menu.space'),
        link: "https://www.dropin8.jp/space",
        target: true
      },
      {
        name: $i18n.t('menu.guesthouse'),
        link: "https://www.dropin8.jp/guest_house",
        target: true
      },
      {
        name: $i18n.t('menu.coderdojo'),
        link: "https://coderdojo-hachinohe.aomori.jp/",
        target: true
      },
    ]
  }
])

const snsList = ref([
  {
    name: "x",
    link: "https://twitter.com/Kurokamome_ens",
    imageSrc: await import(`~/assets/images/sns/icon_x.svg`),
  },
  {
    name: "instagram",
    link: "https://www.instagram.com/kurokamome_ens/",
    imageSrc: await import(`~/assets/images/sns/icon_instagram.svg`),
  },
])
</script>

<template>
  <div>
    <Header
      :menuList="headerMenuList"
      :bgColorClass="'bgYellow'"
      :textColorClass="'text-gray-800'"
      :headerLogoLink="'/kurokamome'"
    />
    <slot />
    <Footer
      :menuList="footerMenuList"
      :snsList="snsList"
      :bgColorClass="'bgYellow'"
      :textColorClass="'text-gray-800'"
      :headerLogoImg="'/images/kurokamome/header_logo.jpg'"
      :headerLogoLink="'/kurokamome'"
      >
    </Footer>
  </div>
</template>

<style lang="scss" scoped></style>
