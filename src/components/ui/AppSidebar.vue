<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import type { NavigationMenuItem } from '@nuxt/ui'

import { pages } from '#constants/pages'
import IconGroovebox from './IconGroovebox.vue'

const { t } = useI18n()
const route = useRoute()

const pageTitle = computed(() => {
  return route.name ? t(`pages.${route.name.toString().toLowerCase()}`) : ''
})

const open = ref(false)
const collapsed = computed(() => open.value === false)

const toggleSidebar = (): void => {
  open.value = !open.value
}

const items: NavigationMenuItem[] = [
  {
    id: pages.chords,
    label: t('pages.chords'),
    to: { name: pages.chords },
    icon: 'i-lucide-keyboard-music'
  },
  {
    id: pages.settings,
    label: t('pages.settings'),
    to: { name: pages.settings },
    icon: 'i-lucide-cog'
  }
]
</script>

<template>
  <div class="relative flex flex-1">
    <USidebar
      v-model:open="open"
      variant="sidebar"
      collapsible="icon"
      side="left"
      :ui="{
        container: 'h-full'
      }"
    >
      <template #header>
        <IconGroovebox class="size-8" />
      </template>

      <UNavigationMenu
        :items="items"
        tooltip
        :collapsed
        orientation="vertical"
        :ui="{ link: 'p-2 overflow-hidden' }"
      />
    </USidebar>

    <div class="flex flex-1 flex-col overflow-hidden">
      <div
        class="bg-default-blur fixed z-10 flex h-(--ui-header-height) w-full shrink-0 items-center px-4"
      >
        <UButton
          :icon="open ? 'i-lucide-panel-left' : 'i-lucide-panel-right'"
          color="neutral"
          variant="ghost"
          aria-label="Toggle sidebar"
          @click="toggleSidebar"
        />

        <span class="mr-2">|</span>
        <h1 v-if="pageTitle" class="font-bold">
          {{ pageTitle }}
        </h1>
      </div>

      <div class="mt-(--ui-header-height) flex-1 p-4">
        <slot />
      </div>
    </div>
  </div>
</template>
