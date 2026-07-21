<script setup lang="ts">
const navLinks = [
  {
    id: 'chords',
    label: 'Chords',
    path: '/chords'
  },
  {
    id: 'settings',
    label: 'Settings',
    path: '/settings'
  }
]
</script>

<template>
  <div class="flex h-screen flex-col items-center justify-center">
    <h1 class="text-4xl font-bold">
      {{ $t('common.greeting') }}
    </h1>

    <p class="mt-4">
      Electron + Vue 3 + Typescript + Nuxt UI + Vue Router + Pinia + Vue I18n
    </p>
    <p class="mt-2 text-sm">With Esline + Prettier</p>
    <nav>
      <ul>
        <li v-for="link in navLinks" :key="link.id">
          <router-link :to="link.path">{{ link.label }}</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>
