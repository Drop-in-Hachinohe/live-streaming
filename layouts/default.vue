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

<script setup lang="ts">
const headerMenuList = ref([
  {
    name: "中の人",
    link: "/kurokamome/owner",
    imageFileName: 'icon_owner.png'
  },
  {
    name: "過去動画",
    link: "https://www.youtube.com/@user-yk8qe2nv2h",
    imageFileName: 'icon_video.png',
    target: true
  },
  {
    name: "お知らせ",
    link: "/kurokamome/news",
    imageFileName: 'icon_news.png'
  },
  {
    name: "お問合せ",
    link: "/kurokamome/contact",
    imageFileName: 'icon_contact.png'
  },
]);

const footerMenuList = ref([
  {
    title: "黒かもめアンサンブルのこと",
    itemList: [
      {
        name: "過去動画",
        link: "https://www.youtube.com/@user-yk8qe2nv2h",
        target: true
      },
      {
        name: "お知らせ",
        link: "/kurokamome/news",
      },
      {
        name: "お問合せ",
        link: "/kurokamome/contact",
      },
      {
        name: "中の人",
        link: "/kurokamome/owner",
      },
    ]
  },
  {
    title: "Drop inの他のこと",
    itemList: [
      {
        name: "不登校はフリーランス",
        link: "/space",
        target: true
      },
      {
        name: "鮫のゲストハウスDrop in",
        link: "/guest_house",
        target: true
      },
      {
        name: "CoderDojo八戸",
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
  },
  {
    name: "instagram",
    link: "https://www.instagram.com/kurokamome_ens/",
  },
])
</script>

<style lang="scss" scoped></style>
