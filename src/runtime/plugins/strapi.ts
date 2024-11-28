import { useStrapiAuth } from '../composables/useStrapiAuth'
import { useStrapiUser } from '../composables/useStrapiUser'
import { defineNuxtPlugin } from '#imports'
// FIXME: https://github.com/nuxt/module-builder/issues/141#issuecomment-2078248248
import type {} from '#app'

export default defineNuxtPlugin(async () => {
  const user = useStrapiUser()

  if (!user.value) {
    const { fetchUser } = useStrapiAuth()

    await fetchUser()
  }
})
