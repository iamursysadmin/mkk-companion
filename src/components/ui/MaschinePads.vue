<script setup lang="ts">
import { pads } from '@/assets/data/pads'
</script>

<template>
  <div class="mx-auto max-w-[85%]">
    <ul class="grid grid-cols-4 gap-6">
      <li v-for="pad in pads" :key="pad.id" class="size-40 bg-neutral-600 p-4">
        {{ pad.label }}
      </li>
    </ul>
  </div>
</template>
