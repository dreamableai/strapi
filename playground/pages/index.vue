<template>
  <div>
    <h1>@nuxtjs/strapi</h1>

    <h2>Url</h2>
    <pre>{{ url }}</pre>
    <h2>Version</h2>
    <pre>{{ version }}</pre>

    <h2>API</h2>
    <button
      type="button"
      @click="getCollections"
    >
      Get collections
    </button>
    <button
      type="button"
      @click="getUntyped"
    >
      Get untyped
    </button>

    <div v-if="user">
      <h2>User</h2>
      <button
        type="button"
        @click="logout"
      >
        Logout
      </button>
      <pre>{{ user }}</pre>
    </div>
    <form
      v-else
      @submit.prevent="onSubmit"
    >
      <input
        v-model="form.identifier"
        placeholder="Email"
        type="text"
        name="email"
        required
      >

      <input
        v-model="form.password"
        placeholder="Password"
        type="password"
        name="password"
        required
      >

      <button type="submit">
        {{ loading ? 'Loading...' : 'Login' }}
      </button>

      <button
        type="button"
        @click="onClick"
      >
        {{ loading ? 'Loading...' : 'Login with GitHub' }}
      </button>
    </form>
  </div>
</template>

<script lang="ts" setup>
const strapi = useStrapi()
const user = useStrapiUser()
const url = useStrapiUrl()
const version = useStrapiVersion()
const { login, logout, getProviderAuthenticationUrl } = useStrapiAuth()

const loading = ref(false)
const form = reactive({ identifier: '', password: '' })

type Collection = {
  firstname: string
  lastname: string
  relation: {
    name: string
    nestedRelation: {
      name: string
      arr: Array<{ name: string }>
    }
  }
}

const getCollections = () => {
  return strapi.find<Collection>('collection', {
    fields: ['firstname'],
    sort: ['lastname:asc', 'firstname'],
    populate: 'relation.nestedRelation.arr'
  })
}

const getUntyped = () => {
  return strapi.find('untyped', {
    sort: ['random'],
    populate: 'relationRandom'
  })
}

const onSubmit = async () => {
  loading.value = true

  try {
    await login(form)
  } catch (e) {
    console.error(e)
  }

  loading.value = false
}

const onClick = () => {
  window.location = getProviderAuthenticationUrl('github') as unknown as Location
}
</script>
