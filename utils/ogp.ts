export type PageTitleI18n = {
  i18nKey: string
  options: any
}

export default function ogp() {
  const updateHead = (
    pageTitleI18n: PageTitleI18n,
    description: string,
    imageUrl?: string
  ) => {
    const { $i18n } = useNuxtApp()
    const path = useRoute().fullPath
    const uhead = (pageTitleI18n: PageTitleI18n) => {
      const title = $i18n.t(pageTitleI18n.i18nKey, pageTitleI18n.options)
      return useHead({
        title,
        meta: _createOgpMeta(title, description, path, imageUrl),
      })
    }
    uhead(pageTitleI18n)

    watch($i18n.locale, () => {
      uhead(pageTitleI18n)
    })
  }

  const _createOgpMeta = (
    pageName: string,
    description: string,
    path: string,
    imageUrl?: string
  ) => {
    const runtimeConfig = useRuntimeConfig()
    const url = runtimeConfig.public.siteUrl + path
    // const title = pageName + ' | ' + runtimeConfig.public.siteName
    const title = pageName
    const meta = [
      { hid: 'description', name: 'description', content: description },
      { hid: 'og:type', property: 'og:type', content: 'article' },
      { hid: 'og:title', property: 'og:title', content: title },
      {
        hid: 'og:description',
        property: 'og:description',
        content: description,
      },
      { hid: 'og:url', property: 'og:url', content: url },
    ]

    if (imageUrl) {
      meta.push({ hid: 'og:image', property: 'og:image', content: imageUrl })
    }

    return meta
  }

  return {
    updateHead,
  }
}
